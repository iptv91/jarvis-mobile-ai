FROM node:18-alpine

WORKDIR /app

# Java yükle (Android build için)
RUN apk add --no-cache openjdk11 gradle

# Bağımlılıkları yükle
COPY package*.json ./
RUN npm ci

# Kod kopyala
COPY . .

# Build script
RUN chmod +x build-apk.sh

CMD ["./build-apk.sh"]
