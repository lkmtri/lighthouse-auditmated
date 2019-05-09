FROM lkmtri/chrome:latest

EXPOSE 3000

# Config virtual display ratio
ENV DISPLAY :99.0

ARG node_env
ENV NODE_ENV $node_env

WORKDIR /oddle

COPY . .

RUN npm i -g yarn && yarn

CMD if [ ${NODE_ENV} = production ] ; then \
  yarn start; \
  else \
  yarn dev; \
  fi
