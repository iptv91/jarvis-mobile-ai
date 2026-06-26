# 🤖 JARVIS - Kurulum Rehberi

## 📱 Telefonda Kurulum

### Adım 1: APK'yı İndir
```bash
# APK dosyasını telefonunuza indirin
jarvis-release.apk
```

### Adım 2: Bilinmeyen Kaynaklar'ı Etkinleştir
1. **Ayarlar** → **Güvenlik**
2. **Bilinmeyen Kaynaklar** → **Açın** ✅

### Adım 3: APK'yı Kur
1. Dosya Yöneticisi'nde `jarvis-release.apk`'yi bulun
2. Üzerine tıklayın
3. **Kur** butonuna tıklayın

### Adım 4: İzinler
1. Uygulamayı açın
2. Gerekli izinleri verin:
   - ✅ Telefon
   - ✅ SMS
   - ✅ Kamera
   - ✅ Mikrofon

---

## 💻 Bilgisayarda (Geliştirme)

### Gereksinimler
- Node.js 16+
- Android SDK
- Java 11+
- Gradle 7+
- 16GB RAM (minimum)
- 30GB Boş Disk

### Kurulum

```bash
# 1. Repo'yu klonla
git clone https://github.com/iptv91/jarvis-mobile-ai.git
cd jarvis-mobile-ai

# 2. Bağımlılıkları yükle
npm install

# 3. APK'yı derle
bash build-apk.sh

# 4. APK'yı telefonunuza gönderin
# Android Studio Device File Explorer kullanabilir veya:
adb push jarvis-release.apk /sdcard/Download/
```

---

## 🐳 Docker ile (En Kolay)

```bash
# 1. Docker image'ı build et
docker build -t jarvis-builder .

# 2. Container'ı çalıştır
docker run --rm -v $(pwd)/output:/app/output jarvis-builder

# 3. APK'yı al
ls output/jarvis-release.apk
```

---

## 🧪 Test Etme

### Komut Örnekleri
```
"Telefonumu kilitle"
"WhatsApp'ı aç"
"Pil seviyesi kaç"
"Ekran parlaklığını %80'e ayarla"
"Müzik çal"
"Saat 7'de alarm kur"
"Telefon durumunu söyle"
```

---

## ⚙️ Sorun Giderme

### APK Kurulumu Başarısız
```bash
# Telefona manuel ADB ile yükle
adb install -r jarvis-release.apk
```

### İzin Hatası
```bash
# İzinleri sıfırla
adb shell pm reset-permissions
```

### APK Dosyası Yok
```bash
# Gradle cache'i temizle
cd android
./gradlew clean
./gradlew assembleRelease
```

---

## 📞 Destek

Sorun varsa:
- GitHub Issues: https://github.com/iptv91/jarvis-mobile-ai/issues
- Email: cruzgar188@gmail.com

**Keyifli kullanımlar!** 🎉
