import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  LinearGradient,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "./theme";

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Merhaba! 👋 Ben Jarvis, senin kişisel AI asistanın. Telefonunu kontrol etmemi istediğin ne var?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponses = [
        "✅ Komut başarıyla gerçekleştirildi!",
        "🤖 Tamamlandı!",
        "⚡ İşlem sona erdi!",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: randomResponse,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const QuickButton = ({ icon, label, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={styles.quickButton}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.quickButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🤖 JARVIS</Text>
        <Text style={styles.headerSubtitle}>AI Telefon Kontrolü</Text>
      </LinearGradient>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.type === "user"
                ? styles.userMessage
                : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickButtonsContainer}
      >
        <QuickButton
          icon="lock"
          label="Kilitle"
          onPress={() => setInput("Telefonumu kilitle")}
        />
        <QuickButton
          icon="lock-open"
          label="Kilit Aç"
          onPress={() => setInput("Telefon kilidini aç")}
        />
        <QuickButton
          icon="music"
          label="Müzik"
          onPress={() => setInput("Müzik çal")}
        />
        <QuickButton
          icon="apps"
          label="Uygulamalar"
          onPress={() => setInput("Açık uygulamaları göster")}
        />
        <QuickButton
          icon="battery"
          label="Pil"
          onPress={() => setInput("Pil seviyesini kontrol et")}
        />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Jarvis'e komut söyle..."
          placeholderTextColor={theme.colors.textSecondary}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={isLoading}
          style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
        >
          <MaterialCommunityIcons
            name="send"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  messagesContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  messageBubble: {
    marginVertical: theme.spacing.xs,
    maxWidth: "80%",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.primary,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  messageText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  quickButtonsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
  },
  quickButton: {
    marginRight: theme.spacing.md,
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    minWidth: 80,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  quickButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: theme.spacing.xs,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
