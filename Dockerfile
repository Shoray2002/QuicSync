FROM node:18-alpine as builder-node

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM golang:1.18-buster AS builder

WORKDIR /src

COPY . .

COPY --from=builder-node /app/server/build /src/server/build

RUN make build

# Bin
FROM alpine AS bin

COPY --from=builder /src/conf/quicsync.toml /etc/quicsync.toml
COPY --from=builder /src/quicsync /usr/bin/quicsync

EXPOSE 8080/tcp

ENTRYPOINT ["/usr/bin/quicsync"]
