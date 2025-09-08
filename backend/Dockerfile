FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install --no-audit --no-fund

COPY . .

# create uploads dir
RUN mkdir -p /usr/src/app/uploads

EXPOSE 5000
CMD ["npm", "start"]
