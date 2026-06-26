# 🤖 JARVIS - AI Telefon Kontrol Sistemi

Claude AI tabanlı mobil uygulama. Telefonunuzu tamamen AI ile kontrol edin!

## ✨ Özellikler

- 🤖 **Claude AI Entegrasyonu** - Doğal dil işleme
- 📱 **Telefon Kontrol** - 14+ kontrol fonksiyonu
- 🎨 **Modern UI** - React Native ile güzel tasarım
- 🌙 **Dark Mode** - Göz dostu tema
- ⚡ **Gerçek Zamanlı** - Anında komut işleme
- 💬 **Chat Arayüzü** - Doğal konuşma stili

## 🎮 Desteklenen Komutlar

- 🔒 Telefonu kilitle/kilit aç
- 📲 Uygulama aç/kapat
- 💬 SMS gönder
- 🔆 Ekran parlaklığını ayarla
- 🔋 Pil seviyesini kontrol et
- 🎵 Müzik çal/durdur
- ⏰ Alarm ayarla
- ☎️ Arama yap
- 📸 Ekran görüntüsü al
- Ve daha fazlası...

## 🚀 Kurulum

### Gerekli Şeyler
- Node.js 16+
- Claude API Key (https://claude.ai)
- npm veya yarn

### Adımlar

```bash
# 1. Repo'yu klonla
git clone https://github.com/iptv91/jarvis-mobile-ai.git
cd jarvis-mobile-ai

# 2. Bağımlılıkları yükle
npm install

# 3. API Key'i ayarla
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env

# 4. Agent'i test et
npm start
```

## 📱 Mobil App Çalıştırma

```bash
# Expo'yu kur
npm install -g expo-cli

# Uygulamayı başlat
npx expo start

# QR kodu telefonla tara
```

## 📋 Örnek Kullanım

```javascript
const { jarvisAgent } = require('./agent.js');

// Komut gönder
await jarvisAgent("Telefonumu kilitle");
await jarvisAgent("WhatsApp'ı aç");
await jarvisAgent("Pil seviyesini göster");
```

## 🏗️ Proje Yapısı

```
jarvis-mobile-ai/
├── agent.js          # Claude AI Agent (Backend)
├── App.js            # React Native UI (Frontend)
├── theme.js          # Tema ve stil tanımlamaları
├── package.json      # Bağımlılıklar
└── README.md         # Dokümantasyon
```

## 🔧 Teknoloji Stack

- **Backend**: Node.js + Claude AI API
- **Frontend**: React Native + Expo
- **UI**: Custom Components + Linear Gradient
- **Icons**: Material Community Icons

## 📝 Lisans

MIT License - Özgür kullanın!

## 👨‍💻 Geliştirici

**iptv91** - [GitHub](https://github.com/iptv91)

## 🤝 Katkıda Bulun

Pull request'ler ve issue'ler açmaktan çekinmeyin! 🎉

---

**Made with ❤️ and Claude AI**
