FROM node:6-alpine

COPY public/ public/
COPY bot-benjamin/ bot-benjamin/
COPY data/ data/
COPY dist/ dist/
COPY functions/ functions/
COPY repositories/ repositories/
COPY routers/ routers/
COPY services/ services/
COPY sockets/ sockets/
COPY index.js ./
COPY package*.json ./

RUN npm install
CMD ["node", "index.js"]