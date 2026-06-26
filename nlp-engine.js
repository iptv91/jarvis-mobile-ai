/**
 * 🧠 JARVIS - Custom NLP Engine
 * Türkçe komut tanıma sistemi (Offline, API yok)
 */

class JarvisNLP {
  constructor() {
    this.commandDatabase = this.initializeCommands();
    this.conversationHistory = [];
    this.phoneState = {
      locked: false,
      brightness: 50,
      openApps: [],
      battery: 85,
      volume: 70,
      wifi: true,
      bluetooth: false,
    };
  }

  /**
   * Komut Veritabanı - Türkçe komutlar
   */
  initializeCommands() {
    return {
      // Kilit Komutları
      lock: {
        keywords: [
          "kilitle",
          "telefonu kilitle",
          "kilidi kapat",
          "ekranı kapat",
          "uyut",
        ],
        action: "lock_phone",
        description: "Telefonu kilitler",
      },
      unlock: {
        keywords: [
          "kilit aç",
          "açılması",
          "kilidi aç",
          "ekranı aç",
          "uyan",
        ],
        action: "unlock_phone",
        description: "Telefonun kilidini açar",
      },

      // Uygulama Komutları
      openApp: {
        keywords: [
          "aç",
          "başlat",
          "çalıştır",
          "uygulamayı aç",
          "açar mısın",
        ],
        action: "open_app",
        description: "Uygulama açar",
      },
      closeApp: {
        keywords: [
          "kapat",
          "durdur",
          "kapatır mısın",
          "uygulamayı kapat",
        ],
        action: "close_app",
        description: "Uygulamayı kapatır",
      },

      // Mesaj Komutları
      sendSMS: {
        keywords: [
          "mesaj gönder",
          "sms gönder",
          "yazı gönder",
          "haber ver",
        ],
        action: "send_sms",
        description: "SMS mesajı gönderir",
      },

      // Ekran Komutları
      brightness: {
        keywords: [
          "parlakl",
          "parlaklık",
          "ekranı aydınlat",
          "ışığı arttır",
          "ışığı azalt",
        ],
        action: "set_brightness",
        description: "Ekran parlaklığını ayarlar",
      },

      // Ses Komutları
      volume: {
        keywords: [
          "ses",
          "sesi arttır",
          "sesi azalt",
          "sessiz",
          "kısık",
        ],
        action: "set_volume",
        description: "Ses seviyesini ayarlar",
      },

      // Pil Komutları
      battery: {
        keywords: [
          "pil",
          "batarya",
          "şarj",
          "enerji",
          "pil kaç",
        ],
        action: "get_battery",
        description: "Pil seviyesini gösterir",
      },

      // Müzik Komutları
      playMusic: {
        keywords: [
          "müzik çal",
          "şarkı çal",
          "müzik başlat",
          "oyna",
        ],
        action: "play_music",
        description: "Müzik çalar",
      },
      stopMusic: {
        keywords: [
          "müziği durdur",
          "şarkıyı durdur",
          "ses kapat",
          "durdur",
        ],
        action: "stop_music",
        description: "Müziği durdurur",
      },

      // Alarm Komutları
      setAlarm: {
        keywords: [
          "alarm",
          "hatırlatıcı",
          "saat kur",
          "alarm kurmak",
        ],
        action: "set_alarm",
        description: "Alarm ayarlar",
      },

      // Arama Komutları
      call: {
        keywords: [
          "ara",
          "telefon et",
          "çağır",
          "arama yap",
        ],
        action: "call",
        description: "Telefon araması yapar",
      },

      // Bilgi Komutları
      getInfo: {
        keywords: [
          "bilgi",
          "durum",
          "nasılsın",
          "neler oldu",
          "telefon",
        ],
        action: "get_phone_info",
        description: "Telefon bilgilerini gösterir",
      },

      // WiFi Komutları
      wifi: {
        keywords: [
          "wifi",
          "internet",
          "bağlantı",
          "ağ",
        ],
        action: "toggle_wifi",
        description: "WiFi'ı aç/kapat",
      },

      // Bluetooth Komutları
      bluetooth: {
        keywords: [
          "bluetooth",
          "blue",
          "bt",
        ],
        action: "toggle_bluetooth",
        description: "Bluetooth'u aç/kapat",
      },

      // Kamera Komutları
      camera: {
        keywords: [
          "fotoğraf çek",
          "kamera",
          "resim çek",
          "ekran görüntüsü",
        ],
        action: "take_screenshot",
        description: "Kamera/Ekran görüntüsü",
      },
    };
  }

  /**
   * Komut Analiz Et
   */
  analyzeCommand(userInput) {
    const input = userInput.toLowerCase().trim();
    console.log(`\n📝 Input: "${input}"`);

    // 1. Tam eşleşme kontrol et
    for (const [key, cmd] of Object.entries(this.commandDatabase)) {
      for (const keyword of cmd.keywords) {
        if (input.includes(keyword)) {
          console.log(`✅ Komut bulundu: ${cmd.action}`);
          return this.extractCommandData(cmd, input);
        }
      }
    }

    // 2. Kısmi eşleşme (fuzzy matching)
    const closestMatch = this.fuzzyMatch(input);
    if (closestMatch) {
      console.log(`⚠️ Benzer komut: ${closestMatch.action}`);
      return closestMatch;
    }

    // 3. Hiçbir şey bulunamadı
    console.log(`❌ Komut bulunamadı`);
    return {
      action: "unknown",
      confidence: 0,
      response: "Üzgünüm, bu komutu anlamadım. Lütfen daha net söyleyebilir misin?",
    };
  }

  /**
   * Fuzzy Matching - Benzer komutları bul
   */
  fuzzyMatch(input) {
    let bestMatch = null;
    let bestScore = 0;

    for (const [key, cmd] of Object.entries(this.commandDatabase)) {
      for (const keyword of cmd.keywords) {
        const score = this.calculateSimilarity(input, keyword);
        if (score > bestScore && score > 0.6) {
          bestScore = score;
          bestMatch = cmd;
        }
      }
    }

    return bestMatch
      ? { ...bestMatch, confidence: bestScore }
      : null;
  }

  /**
   * Benzerlik Skoru Hesapla (Levenshtein Distance)
   */
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Edit Distance Hesapla
   */
  getEditDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  /**
   * Komuttan veri çıkart
   */
  extractCommandData(cmd, input) {
    const data = {
      action: cmd.action,
      description: cmd.description,
      confidence: 0.95,
      params: {},
    };

    // Sayıları çıkart (parlaklık, ses, vb.)
    const numbers = input.match(/\d+/g);
    if (numbers) {
      data.params.value = parseInt(numbers[0]);
    }

    // Saat formatı çıkart (alarm için)
    const timeMatch = input.match(/(\d{1,2})[:\s](\d{2})/);
    if (timeMatch) {
      data.params.time = `${timeMatch[1]}:${timeMatch[2]}`;
    }

    // Uygulama adı çıkart
    const apps = [
      "whatsapp",
      "instagram",
      "facebook",
      "youtube",
      "spotify",
      "telegram",
      "twitter",
      "gmail",
      "chrome",
      "maps",
    ];
    for (const app of apps) {
      if (input.includes(app)) {
        data.params.appName = app;
        break;
      }
    }

    // Telefon numarası çıkart
    const phoneMatch = input.match(/(\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/);
    if (phoneMatch) {
      data.params.phone = phoneMatch[0];
    }

    return data;
  }

  /**
   * Komut Çalıştır
   */
  async executeCommand(commandData) {
    console.log(`\n⚙️ Executing: ${commandData.action}`);

    const actions = {
      lock_phone: () => this.lockPhone(),
      unlock_phone: () => this.unlockPhone(),
      open_app: () => this.openApp(commandData.params.appName),
      close_app: () => this.closeApp(commandData.params.appName),
      send_sms: () => this.sendSMS(commandData.params),
      set_brightness: () => this.setBrightness(commandData.params.value),
      set_volume: () => this.setVolume(commandData.params.value),
      get_battery: () => this.getBattery(),
      play_music: () => this.playMusic(commandData.params.song),
      stop_music: () => this.stopMusic(),
      set_alarm: () => this.setAlarm(commandData.params.time),
      call: () => this.call(commandData.params.phone),
      get_phone_info: () => this.getPhoneInfo(),
      toggle_wifi: () => this.toggleWiFi(),
      toggle_bluetooth: () => this.toggleBluetooth(),
      take_screenshot: () => this.takeScreenshot(),
      unknown: () => commandData.response,
    };

    const action = actions[commandData.action];
    return action ? action() : "Komut çalıştırılamadı.";
  }

  // Telefon Kontrol Fonksiyonları
  lockPhone() {\n    this.phoneState.locked = true;
    return "🔒 Telefon kilitlendi!";
  }

  unlockPhone() {
    this.phoneState.locked = false;
    return "🔓 Telefon kilit açıldı!";
  }

  openApp(appName) {
    if (appName && !this.phoneState.openApps.includes(appName)) {
      this.phoneState.openApps.push(appName);
    }
    return `✅ ${appName || "Uygulama"} açılıyor...`;
  }

  closeApp(appName) {
    this.phoneState.openApps = this.phoneState.openApps.filter(
      (a) => a !== appName
    );
    return `❌ ${appName || "Uygulama"} kapatıldı!`;
  }

  sendSMS(params) {
    return `💬 ${params.phone || "Numara"} numarasına mesaj gönderiliyor...`;
  }

  setBrightness(value) {
    if (value) {
      this.phoneState.brightness = Math.min(100, Math.max(0, value));
      return `☀️ Parlaklık %${this.phoneState.brightness} olarak ayarlandı`;
    }
    return "☀️ Parlaklık ayarlarını yapabilirsiniz";
  }

  setVolume(value) {
    if (value) {
      this.phoneState.volume = Math.min(100, Math.max(0, value));
      return `🔊 Ses %${this.phoneState.volume} olarak ayarlandı`;
    }
    return "🔊 Ses ayarlarını yapabilirsiniz";
  }

  getBattery() {
    return `🔋 Pil seviyesi: %${this.phoneState.battery}`;
  }

  playMusic(song) {
    return `🎵 Müzik çalınıyor${song ? ": " + song : ""}...`;
  }

  stopMusic() {
    return "⏹️ Müzik durduruldu!";
  }

  setAlarm(time) {
    return `⏰ Alarm ${time || "ayarlandı"}`;
  }

  call(phone) {
    return `☎️ ${phone || "Numara"} aranıyor...`;
  }

  getPhoneInfo() {
    return `📱 Telefon Durumu:
    • Kilit: ${this.phoneState.locked ? "🔒 Kilitli" : "🔓 Açık"}
    • Pil: 🔋 %${this.phoneState.battery}
    • Ses: 🔊 %${this.phoneState.volume}
    • Parlaklık: ☀️ %${this.phoneState.brightness}
    • Açık Uygulamalar: ${
      this.phoneState.openApps.length > 0
        ? this.phoneState.openApps.join(", ")
        : "Yok"
    }
    • WiFi: ${this.phoneState.wifi ? "✅" : "❌"}
    • Bluetooth: ${this.phoneState.bluetooth ? "✅" : "❌"}`;
  }

  toggleWiFi() {
    this.phoneState.wifi = !this.phoneState.wifi;
    return `📶 WiFi ${this.phoneState.wifi ? "açıldı ✅" : "kapatıldı ❌"}`;
  }

  toggleBluetooth() {
    this.phoneState.bluetooth = !this.phoneState.bluetooth;
    return `🔵 Bluetooth ${this.phoneState.bluetooth ? "açıldı ✅" : "kapatıldı ❌"}`;
  }

  takeScreenshot() {
    return "📸 Ekran görüntüsü alındı!";
  }

  /**
   * Cevap Üret (Context-aware)\n   */\n  generateResponse(commandData, result) {
    const responses = {
      lock_phone: [
        "Telefonunuz kilitlendi! 🔒",
        "Tamam, kilitleniyor...",
        "Kilitlendi!",
      ],
      unlock_phone: [
        "Kilidi açtım! 🔓",
        "Hoşgeldiniz!",
        "Açıldı!",
      ],
      open_app: [
        "Uygulamayı açıyorum...",
        "Bir saniye lütfen...",
        "Açılıyor!",
      ],
      unknown: [
        "Anlamadım, tekrar söyler misin?",
        "Biraz daha net konuşur musun?",
        "Bu komutu tanımıyorum.",
      ],
    };

    const responses_array =
      responses[commandData.action] || responses.unknown;
    return (
      responses_array[
        Math.floor(Math.random() * responses_array.length)
      ] + " " + result
    );
  }

  /**
   * Ana Process Fonksiyonu
   */
  async process(userInput) {
    console.log("\\n" + "=".repeat(60));
    console.log(`👤 Kullanıcı: ${userInput}`);

    // Komut analiz et
    const commandData = this.analyzeCommand(userInput);

    // Komut çalıştır
    const result = await this.executeCommand(commandData);

    // Cevap üret
    const response = this.generateResponse(commandData, result);

    console.log(`🤖 Jarvis: ${response}`);
    console.log("=".repeat(60));

    return {
      command: commandData,
      result: result,
      response: response,
    };
  }
}

module.exports = JarvisNLP;
