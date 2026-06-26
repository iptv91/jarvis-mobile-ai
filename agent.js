/**
 * 🤖 JARVIS - Updated Agent with Local NLP Engine
 * Tamamen Offline, API yok!
 */

const JarvisNLP = require("./nlp-engine");

class JarvisAgent {
  constructor() {
    this.nlp = new JarvisNLP();
    this.sessionActive = true;
    console.log("🤖 JARVIS başlatılıyor...");
  }

  /**
   * Komutu işle ve cevap ver
   */
  async handleCommand(userInput) {
    try {
      const result = await this.nlp.process(userInput);
      return result;
    } catch (error) {
      console.error("❌ Hata:", error.message);
      return {
        command: { action: "error" },
        result: "Bir hata oluştu",
        response: "Üzgünüm, bir hata oluştu. Lütfen tekrar dene.",
      };
    }
  }

  /**
   * Sesli komut desteği (Web Speech API)
   */
  async handleVoiceCommand(audioData) {
    console.log("🎤 Sesli komut alındı");
    return await this.handleCommand(audioData);
  }

  /**
   * Komut geçmişi
   */
  getHistory() {
    return this.nlp.conversationHistory;
  }

  /**
   * Mevcut telefon durumu
   */
  getPhoneState() {
    return this.nlp.phoneState;
  }
}

// Test Komutları
async function runDemo() {
  const jarvis = new JarvisAgent();

  const testCommands = [
    "Telefonumu kilitle",
    "WhatsApp'ı aç",
    "Pil seviyesi ne kadar",
    "Ekran parlaklığını %80'e ayarla",
    "Müzik çal",
    "Saat 7'de alarm kur",
    "Telefon durumunu söyle",
    "WiFi'yı aç",
    "Ses seviyesini %50'ye ayarla",
    "Instagram'ı kapat",
  ];

  console.log("\n" + "=".repeat(70));
  console.log("🧪 JARVIS NLP ENGINE - TEST MODU");
  console.log("=".repeat(70));

  for (const command of testCommands) {
    const result = await jarvis.handleCommand(command);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n" + "=".repeat(70));
  console.log("📱 SON TELEFON DURUMU:");
  console.log(JSON.stringify(jarvis.getPhoneState(), null, 2));
  console.log("=".repeat(70));
}

// Başlat
if (require.main === module) {
  runDemo().catch(console.error);
}

module.exports = { JarvisAgent };
