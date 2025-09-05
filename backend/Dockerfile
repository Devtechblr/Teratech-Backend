FROM node:18

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json ./
RUN npm install

# Copy app source + certificate
COPY . .
COPY isrgrootx1.pem /app/isrgrootx1.pem

EXPOSE 4000

CMD ["npm", "start"]