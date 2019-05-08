FROM lkmtri/chrome:latest

EXPOSE 3000

# Config virtual display ratio
ENV DISPLAY :99.0

WORKDIR /oddle

COPY . .

RUN npm i -g yarn && yarn

RUN mkdir results

CMD yarn start
