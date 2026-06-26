const Anthropic = require("@anthropic-ai/sdk").default;

const client = new Anthropic();

// Telefonun özellikleri (simüle)
const phoneState = {
  locked: false,
  brightness: 50,
  openApps: [],
  notifications: [],
  battery: 85,
};

// Telefon kontrol fonksiyonları
const phoneControls = {
  lock_phone: () => {
    phoneState.locked = true;
    return "📱 Telefon kilitlendi 🔒";
  },

  unlock_phone: () => {
    phoneState.locked = false;
    return "📱 Telefon kilit açıldı 🔓";
  },

  open_app: (app_name) => {
    if (!phoneState.openApps.includes(app_name)) {
      phoneState.openApps.push(app_name);
    }
    return `✅ ${app_name} açılıyor... 🚀`;
  },

  close_app: (app_name) => {
    phoneState.openApps = phoneState.openApps.filter((a) => a !== app_name);
    return `❌ ${app_name} kapatıldı`;
  },

  send_sms: (phone, message) => {
    return `💬 ${phone} numarasına mesaj gönderiliyor:\n"${message}"`;
  },

  set_brightness: (level) => {
    phoneState.brightness = Math.min(100, Math.max(0, level));
    return `☀️ Ekran parlaklığı %${phoneState.brightness} olarak ayarlandı`;
  },

  get_battery: () => {
    return `🔋 Pil seviyesi: %${phoneState.battery}`;
  },

  get_open_apps: () => {
    return `📂 Açık uygulamalar: ${
      phoneState.openApps.length > 0
        ? phoneState.openApps.join(", ")
        : "Hiç uygulama açık değil"
    }`;
  },

  take_screenshot: () => {
    return "📸 Ekran görüntüsü alındı";
  },

  set_alarm: (time) => {
    return `⏰ Alarm ${time}'de ayarlandı`;
  },

  play_music: (song) => {
    return `🎵 Müzik çalınıyor: ${song}`;
  },

  stop_music: () => {
    return "⏹️ Müzik durduruldu";
  },

  call: (phone) => {
    return `☎️ ${phone} numarasına aranıyor...`;
  },

  get_phone_info: () => {
    return `📱 Telefon Bilgileri:
    - Kilit Durması: ${phoneState.locked ? "Kilitli 🔒" : "Açık 🔓"}
    - Pil: %${phoneState.battery}
    - Parlaklık: %${phoneState.brightness}
    - Açık Uygulamalar: ${
      phoneState.openApps.length > 0
        ? phoneState.openApps.join(", ")
        : "Yok"
    }`;
  },
};

// Tools tanımı
const tools = [
  {
    name: "lock_phone",
    description: "Telefonu kilitler",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "unlock_phone",
    description: "Telefonun kilidini açar",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "open_app",
    description: "Bir uygulamayı açar",
    input_schema: {
      type: "object",
      properties: {
        app_name: {
          type: "string",
          description: "Açılacak uygulamanın adı (örn: WhatsApp, Instagram, Spotify)",
        },
      },
      required: ["app_name"],
    },
  },
  {
    name: "close_app",
    description: "Bir uygulamayı kapatır",
    input_schema: {
      type: "object",
      properties: {
        app_name: { type: "string", description: "Kapatılacak uygulamanın adı" },
      },
      required: ["app_name"],
    },
  },
  {
    name: "send_sms",
    description: "SMS mesajı gönderir",
    input_schema: {
      type: "object",
      properties: {
        phone: { type: "string", description: "Alıcı telefon numarası" },
        message: { type: "string", description: "Gönderilecek mesaj metni" },
      },
      required: ["phone", "message"],
    },
  },
  {
    name: "set_brightness",
    description: "Ekran parlaklığını ayarlar (0-100)",
    input_schema: {
      type: "object",
      properties: {
        level: { type: "number", description: "Parlaklık seviyesi (0-100)" },
      },
      required: ["level"],
    },
  },
  {
    name: "get_battery",
    description: "Pil seviyesini kontrol eder",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "get_open_apps",
    description: "Açık olan uygulamaları listeler",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "take_screenshot",
    description: "Ekran görüntüsü alır",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "set_alarm",
    description: "Alarm ayarlar",
    input_schema: {
      type: "object",
      properties: {
        time: { type: "string", description: "Alarm saati (örn: 07:30)" },
      },
      required: ["time"],
    },
  },
  {
    name: "play_music",
    description: "Müzik çalar",
    input_schema: {
      type: "object",
      properties: {
        song: { type: "string", description: "Çalınacak şarkı adı" },
      },
      required: ["song"],
    },
  },
  {
    name: "stop_music",
    description: "Müziği durdurur",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "call",
    description: "Bir numaraya arama yapar",
    input_schema: {
      type: "object",
      properties: {
        phone: { type: "string", description: "Aranacak telefon numarası" },
      },
      required: ["phone"],
    },
  },
  {
    name: "get_phone_info",
    description: "Telefonun genel bilgilerini gösterir",
    input_schema: { type: "object", properties: {} },
  },
];

function executeTool(toolName, params) {
  const tool = phoneControls[toolName];
  if (tool) {
    return Object.keys(params).length === 0 ? tool() : tool(...Object.values(params));
  }
  return "❌ Bilinmeyen komut";
}

async function jarvisAgent(userMessage) {
  console.log("\n" + "=".repeat(60));
  console.log(`👤 Kullanıcı: ${userMessage}`);
  console.log("=".repeat(60));

  const messages = [{ role: "user", content: userMessage }];

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system:
        "Sen Jarvis isimli bir yapay zeka asistanısın. Kullanıcının telefonunu kontrol etmekle görevlisin. Tüm komutları doğru ve etkili bir şekilde yerine getir. Cevaplarını kısa ve anlaşılır tut. Türkçe cevap ver.",
      tools: tools,
      messages: messages,
    });

    for (const block of response.content) {
      if (block.type === "text") {
        console.log(`\n🤖 Jarvis: ${block.text}`);
      } else if (block.type === "tool_use") {
        console.log(`\n⚙️ Tool Kullanılıyor: ${block.name}`);
        console.log(`📋 Parametreler:`, block.input);

        const toolResult = executeTool(block.name, block.input);
        console.log(`\n✨ Sonuç: ${toolResult}`);

        const followUpMessages = [
          ...messages,
          { role: "assistant", content: response.content },
          {
            role: "user",
            content: [
              { type: "tool_result", tool_use_id: block.id, content: toolResult },
            ],
          },
        ];

        const followUpResponse = await client.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          system: "Sen Jarvis asistanısın. Tool sonuçlarını doğru bir şekilde rapor et. Türkçe cevap ver.",
          tools: tools,
          messages: followUpMessages,
        });

        for (const followBlock of followUpResponse.content) {
          if (followBlock.type === "text") {
            console.log(`\n🤖 Jarvis: ${followBlock.text}`);
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Hata:", error.message);
  }

  console.log("=".repeat(60) + "\n");
}

async function runTests() {
  await jarvisAgent("Telefonumu kilitle");
  await jarvisAgent("WhatsApp'ı aç ve Instagram'ı da aç");
  await jarvisAgent("Pil seviyem ne kadar?");
  await jarvisAgent("Telefonun genel durumunu söyle");
  await jarvisAgent("Ekran parlaklığını %30'a ayarla");
  await jarvisAgent("Saat 7'de alarm kur");
  await jarvisAgent("Müzik çal");
}

runTests().catch(console.error);

module.exports = { jarvisAgent, phoneState };
