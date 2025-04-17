# Fase 1: Construcción
FROM node:20 AS builder

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar solo los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para la fase de build)
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Construir la aplicación NestJS usando el CLI local
RUN npx nest build

# Fase 2: Imagen final
FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos necesarios desde la fase de construcción
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package*.json ./

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/src/main"]
