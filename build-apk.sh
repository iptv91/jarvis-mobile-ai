#!/bin/bash

# JARVIS APK Build Script
echo "🤖 JARVIS APK Derlemeleri Başlıyor..."

# 1. Bağımlılıkları yükle
echo "📦 Bağımlılıklar yükleniyor..."
npm install

# 2. React Native build hazırla
echo "🔨 React Native build hazırlanıyor..."
npx react-native start &
sleep 10

# 3. Android build
echo "🚀 Android APK derleniyorsss..."
cd android
./gradlew clean
./gradlew assembleRelease
cd ..

# 4. APK'yı taşı
echo "📥 APK dosyası taşınıyor..."
cp android/app/build/outputs/apk/release/app-release.apk ./jarvis-release.apk

echo "✅ APK Hazır!"
echo "📍 Konum: ./jarvis-release.apk"
echo "💾 Boyut: $(du -h ./jarvis-release.apk | cut -f1)"
