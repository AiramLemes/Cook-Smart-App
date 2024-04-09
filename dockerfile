# Usa la imagen base de Node
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json para instalar las dependencias
COPY package.json .


# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

EXPOSE 8081

# Comando predeterminado para ejecutar la aplicación (cámbialo según sea necesario)
CMD ["npx", "expo", "start", "-p", "8081"]

