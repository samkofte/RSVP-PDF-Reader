# RSVP-PDF-Reader

# 📚 RSVP PDF Hızlı Okuma Uygulaması

> Modern ve gelişmiş RSVP (Rapid Serial Visual Presentation) tekniği ile PDF dosyalarını hızlı okuma web uygulaması

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![PDF.js](https://img.shields.io/badge/PDF.js-FF6B35?logo=adobe&logoColor=white)

## ✨ Özellikler

### 📄 PDF İşleme
- **PDF.js entegrasyonu** ile güvenli PDF dosya okuma
- Tüm sayfalardaki metinleri otomatik çıkarma
- Sayfa bazında kelime indeksleme
- Dosya boyutu ve sayfa sayısı sınırı yok

### ⚡ RSVP Okuma Sistemi
- **Hız kontrolü**: 50-1000 WPM (Words Per Minute) arası ayarlanabilir
- **Gösterim modları**: 1, 2 veya 3 kelime birden gösterme
- **Akıcı animasyonlar** ile göz yorgunluğunu azaltma
- **Otomatik kelime geçişi** ile kesintisiz okuma deneyimi

### 🎮 Kontrol Sistemi
- **Oynatma kontrolleri**: Oynat, duraklat, durdur, geri, ileri
- **Klavye kısayolları**: 
  - `Space`: Oynat/Duraklat
  - `←/→`: Geri/İleri kelime
  - `Esc`: Durdur
- **Sayfa seçimi**: İstediğiniz sayfadan okumaya başlama

### 🎨 Tema Sistemi
- **Açık Tema**: Modern beyaz tasarım
- **Koyu Tema**: Göz dostu karanlık mod
- **Sepya Tema**: Klasik kağıt görünümü
- **Otomatik kaydetme** ile tema tercihinizi hatırlama

### 📊 İlerleme Takibi
- **Görsel ilerleme çubuğu** ile okuma durumu
- **Kelime sayacı**: Mevcut/Toplam kelime gösterimi
- **LocalStorage entegrasyonu** ile otomatik kaydetme
- **Kaldığı yerden devam etme** özelliği

### 📱 Responsive Tasarım
- **Mobil uyumlu** arayüz
- **Tablet optimizasyonu**
- **Desktop deneyimi**
- **Touch kontrolleri** mobil cihazlar için

## 🚀 Kurulum

### Hızlı Başlangıç

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/rsvp-pdf-reader.git
   cd rsvp-pdf-reader
   ```

2. **Web sunucusu başlatın**
   ```bash
   # Python ile
   python -m http.server 8000
   
   # Node.js ile
   npx serve .
   
   # PHP ile
   php -S localhost:8000
   ```

3. **Tarayıcıda açın**
   ```
   http://localhost:8000
   ```

### Alternatif Kurulum

- **GitHub Pages**: Projeyi fork edin ve GitHub Pages'te yayınlayın
- **Netlify**: Drag & drop ile deploy edin
- **Vercel**: Git entegrasyonu ile otomatik deploy

## 📖 Kullanım

### Temel Kullanım

1. **PDF Yükleme**
   - "📄 PDF Dosyası Seçin" butonuna tıklayın
   - Bilgisayarınızdan PDF dosyasını seçin
   - Dosya otomatik olarak işlenecektir

2. **Okuma Ayarları**
   - **Hız**: Slider ile okuma hızınızı ayarlayın (WPM)
   - **Tema**: Göz rahatlığınıza uygun temayı seçin
   - **Gösterim**: Aynı anda kaç kelime görmek istediğinizi belirleyin

3. **Sayfa Seçimi**
   - "Başlangıç Sayfası" alanına sayfa numarası girin
   - "Bu Sayfadan Başlat" butonuna tıklayın
   - Seçilen sayfanın ilk kelimesinden okuma başlar

4. **Okuma Kontrolü**
   - **▶️ Oynat**: Okumaya başlar
   - **⏸️ Duraklat**: Okumayı duraklatır
   - **⏹️ Durdur**: Okumayı durdurur ve başa döner
   - **⏮️ Geri**: Önceki kelimeye geçer
   - **⏭️ İleri**: Sonraki kelimeye geçer

### Gelişmiş Özellikler

#### Kaldığı Yerden Devam Etme
- Uygulama otomatik olarak okuma pozisyonunuzu kaydeder
- Aynı PDF'i tekrar yüklediğinizde kaldığınız yerden devam edebilirsiniz
- Tarayıcı kapatılsa bile veriler korunur

#### Klavye Kısayolları
```
Space     → Oynat/Duraklat
←         → Önceki kelime
→         → Sonraki kelime
Escape    → Durdur
```

## 🛠️ Teknik Detaylar

### Teknoloji Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **PDF İşleme**: PDF.js v3.11.174
- **Depolama**: LocalStorage API
- **Animasyonlar**: CSS3 Transitions & Keyframes
- **Responsive**: CSS Grid & Flexbox

### Tarayıcı Desteği
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile Safari
- ✅ Chrome Mobile

### Performans
- **Hafif**: Tek HTML dosyası (~50KB)
- **Hızlı**: PDF.js worker ile asenkron işleme
- **Verimli**: LocalStorage ile minimal veri kullanımı
- **Optimize**: CSS ve JS minification ready

## 🎯 RSVP Tekniği Hakkında

**RSVP (Rapid Serial Visual Presentation)**, kelimelerin tek tek veya küçük gruplar halinde sabit bir noktada gösterildiği hızlı okuma tekniğidir.

### Avantajları
- 📈 **Okuma hızını artırır** (2-3x daha hızlı)
- 👁️ **Göz hareketlerini azaltır**
- 🧠 **Konsantrasyonu artırır**
- ⚡ **Alt sesli okumayı engeller**
- 📚 **Anlama oranını korur**

### Önerilen Hızlar
- **Başlangıç**: 200-250 WPM
- **Orta seviye**: 300-400 WPM
- **İleri seviye**: 500-700 WPM
- **Uzman**: 800+ WPM

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak için:

1. **Fork** edin
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** edin (`git commit -m 'Add amazing feature'`)
4. **Push** edin (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

### Geliştirme Ortamı

```bash
# Projeyi klonlayın
git clone https://github.com/kullaniciadi/rsvp-pdf-reader.git
cd rsvp-pdf-reader

# Geliştirme sunucusu başlatın
python -m http.server 8000

# Tarayıcıda açın
open http://localhost:8000
```

### Kod Standartları
- **ES6+** JavaScript kullanın
- **Semantic HTML** yazın
- **BEM** CSS metodolojisi
- **Mobile-first** responsive tasarım
- **Accessibility** standartlarına uyun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [PDF.js](https://mozilla.github.io/pdf.js/) - Mozilla'nın harika PDF kütüphanesi
- [Inter Font](https://rsms.me/inter/) - Modern tipografi
- [CSS Gradient](https://cssgradient.io/) - Güzel gradient'ler

## 📞 İletişim

- **GitHub**: [@kullaniciadi](https://github.com/kullaniciadi)
- **Email**: email@example.com
- **Website**: [website.com](https://website.com)

---

<div align="center">
  <strong>⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!</strong>
</div>

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/kullaniciadi">@kullaniciadi</a>
</div>