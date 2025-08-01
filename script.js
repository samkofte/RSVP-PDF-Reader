// PDF.js worker ayarı
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class RSVPReader {
    constructor() {
        this.words = [];
        this.pages = []; // Sayfa bilgileri
        this.currentIndex = 0;
        this.isPlaying = false;
        this.intervalId = null;
        this.speed = 250; // WPM
        this.wordCount = 1;
        this.currentFileName = null;
        this.totalPages = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.checkForSavedProgress();
    }

    initializeElements() {
        this.elements = {
            pdfFile: document.getElementById('pdfFile'),
            speedSlider: document.getElementById('speedSlider'),
            speedValue: document.getElementById('speedValue'),
            themeSelect: document.getElementById('themeSelect'),
            wordCountSelect: document.getElementById('wordCountSelect'),
            startPageInput: document.getElementById('startPageInput'),
            startFromPageBtn: document.getElementById('startFromPageBtn'),
            pageInfo: document.getElementById('pageInfo'),
            totalPagesSpan: document.getElementById('totalPagesSpan'),
            totalWordsInfo: document.getElementById('totalWordsInfo'),
            playBtn: document.getElementById('playBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            stopBtn: document.getElementById('stopBtn'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            wordDisplay: document.getElementById('wordDisplay'),
            progressFill: document.getElementById('progressFill'),
            currentWord: document.getElementById('currentWord'),
            totalWords: document.getElementById('totalWords'),
            statusMessage: document.getElementById('statusMessage')
        };
    }

    bindEvents() {
        this.elements.pdfFile.addEventListener('change', (e) => this.handleFileSelect(e));
        this.elements.speedSlider.addEventListener('input', (e) => this.updateSpeed(e.target.value));
        this.elements.themeSelect.addEventListener('change', (e) => this.changeTheme(e.target.value));
        this.elements.wordCountSelect.addEventListener('change', (e) => this.changeWordCount(e.target.value));
        this.elements.startFromPageBtn.addEventListener('click', () => this.startFromPage());
        
        this.elements.playBtn.addEventListener('click', () => this.play());
        this.elements.pauseBtn.addEventListener('click', () => this.pause());
        this.elements.stopBtn.addEventListener('click', () => this.stop());
        this.elements.prevBtn.addEventListener('click', () => this.previousWord());
        this.elements.nextBtn.addEventListener('click', () => this.nextWord());

        // Klavye kısayolları
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.isPlaying ? this.pause() : this.play();
            } else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                this.previousWord();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                this.nextWord();
            } else if (e.code === 'Escape') {
                e.preventDefault();
                this.stop();
            }
        });
    }

    async handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.currentFileName = file.name;
        this.showMessage('PDF dosyası işleniyor...', 'info');

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            
            this.totalPages = pdf.numPages;
            this.pages = [];
            this.words = [];
            
            let totalWordCount = 0;
            
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                const pageWords = pageText.split(/\s+/).filter(word => word.trim().length > 0);
                
                const startWordIndex = totalWordCount;
                const wordCount = pageWords.length;
                
                this.pages.push({
                    pageNumber: pageNum,
                    startWordIndex: startWordIndex,
                    wordCount: wordCount,
                    text: pageText
                });
                
                this.words.push(...pageWords);
                totalWordCount += wordCount;
            }

            this.updatePageInfo();
            this.enableControls();
            this.updateDisplay();
            this.updateProgress();
            this.showMessage(`PDF başarıyla yüklendi! ${this.words.length} kelime bulundu.`, 'success');
            this.checkForSavedProgress();
            
        } catch (error) {
            console.error('PDF işleme hatası:', error);
            this.showMessage('PDF dosyası işlenirken hata oluştu.', 'error');
        }
    }

    updatePageInfo() {
        this.elements.totalPagesSpan.textContent = this.totalPages;
        this.elements.totalWordsInfo.textContent = this.words.length;
        this.elements.pageInfo.style.display = 'block';
        this.elements.startPageInput.disabled = false;
        this.elements.startPageInput.max = this.totalPages;
        this.elements.startFromPageBtn.disabled = false;
    }

    startFromPage() {
        const pageNumber = parseInt(this.elements.startPageInput.value);
        if (pageNumber < 1 || pageNumber > this.totalPages) {
            this.showMessage(`Geçerli sayfa numarası girin (1-${this.totalPages})`, 'error');
            return;
        }
        
        const page = this.pages.find(p => p.pageNumber === pageNumber);
        if (page) {
            this.currentIndex = page.startWordIndex;
            this.updateDisplay();
            this.updateProgress();
            this.showMessage(`${pageNumber}. sayfadan okuma başlatıldı.`, 'success');
        }
    }

    updateSpeed(value) {
        this.speed = parseInt(value);
        this.elements.speedValue.textContent = value;
        this.saveSettings();
        
        if (this.isPlaying) {
            this.pause();
            this.play();
        }
    }

    changeTheme(theme) {
        document.body.className = theme;
        this.saveSettings();
    }

    changeWordCount(count) {
        this.wordCount = parseInt(count);
        this.updateDisplay();
        this.saveSettings();
    }

    play() {
        if (this.words.length === 0) {
            this.showMessage('Önce bir PDF dosyası seçin.', 'error');
            return;
        }

        this.isPlaying = true;
        this.updateButtonStates();
        
        const interval = 60000 / this.speed; // milisaniye
        this.intervalId = setInterval(() => {
            this.nextWord();
            this.saveProgress();
        }, interval);
    }

    pause() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updateButtonStates();
        this.saveProgress();
    }

    stop() {
        this.pause();
        this.currentIndex = 0;
        this.updateDisplay();
        this.updateProgress();
        this.saveProgress();
    }

    nextWord() {
        if (this.currentIndex < this.words.length - this.wordCount) {
            this.currentIndex += this.wordCount;
            this.updateDisplay();
            this.updateProgress();
        } else {
            this.pause();
            this.showMessage('Okuma tamamlandı!', 'success');
        }
    }

    previousWord() {
        if (this.currentIndex >= this.wordCount) {
            this.currentIndex -= this.wordCount;
            this.updateDisplay();
            this.updateProgress();
            this.saveProgress();
        }
    }

    updateDisplay() {
        if (this.words.length === 0) return;
        
        const wordsToShow = [];
        for (let i = 0; i < this.wordCount && this.currentIndex + i < this.words.length; i++) {
            wordsToShow.push(this.words[this.currentIndex + i]);
        }
        
        this.elements.wordDisplay.textContent = wordsToShow.join(' ');
        this.elements.wordDisplay.classList.add('pulse');
        
        setTimeout(() => {
            this.elements.wordDisplay.classList.remove('pulse');
        }, 400);
    }

    updateProgress() {
        if (this.words.length === 0) return;
        
        const progress = (this.currentIndex / this.words.length) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.currentWord.textContent = this.currentIndex + 1;
        this.elements.totalWords.textContent = this.words.length;
    }

    enableControls() {
        this.elements.playBtn.disabled = false;
        this.elements.pauseBtn.disabled = false;
        this.elements.stopBtn.disabled = false;
        this.elements.prevBtn.disabled = false;
        this.elements.nextBtn.disabled = false;
    }

    updateButtonStates() {
        this.elements.playBtn.disabled = this.isPlaying;
        this.elements.pauseBtn.disabled = !this.isPlaying;
    }

    showMessage(message, type) {
        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.className = `status-message status-${type}`;
        this.elements.statusMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.elements.statusMessage.classList.add('hidden');
        }, 3000);
    }

    saveSettings() {
        const settings = {
            speed: this.speed,
            theme: document.body.className,
            wordCount: this.wordCount
        };
        localStorage.setItem('rsvp-settings', JSON.stringify(settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('rsvp-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            
            if (settings.speed) {
                this.speed = settings.speed;
                this.elements.speedSlider.value = settings.speed;
                this.elements.speedValue.textContent = settings.speed;
            }
            
            if (settings.theme) {
                document.body.className = settings.theme;
                this.elements.themeSelect.value = settings.theme;
            }
            
            if (settings.wordCount) {
                this.wordCount = settings.wordCount;
                this.elements.wordCountSelect.value = settings.wordCount;
            }
        }
    }

    saveProgress() {
        if (this.currentFileName && this.words.length > 0) {
            const progress = {
                fileName: this.currentFileName,
                currentIndex: this.currentIndex,
                totalWords: this.words.length,
                timestamp: Date.now()
            };
            localStorage.setItem('rsvp-progress', JSON.stringify(progress));
        }
    }

    checkForSavedProgress() {
        if (!this.currentFileName) return;
        
        const saved = localStorage.getItem('rsvp-progress');
        if (saved) {
            const progress = JSON.parse(saved);
            
            if (progress.fileName === this.currentFileName && 
                progress.totalWords === this.words.length &&
                progress.currentIndex > 0) {
                
                const shouldResume = confirm(
                    `Bu dosyada daha önce ${progress.currentIndex + 1}. kelimede kalmıştınız. ` +
                    `Kaldığınız yerden devam etmek ister misiniz?`
                );
                
                if (shouldResume) {
                    this.currentIndex = progress.currentIndex;
                    this.updateDisplay();
                    this.updateProgress();
                    this.showMessage('Kaldığınız yerden devam ediliyor...', 'info');
                }
            }
        }
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new RSVPReader();
});