FROM node:20 AS dev

WORKDIR /app

COPY . .

RUN npm i -g pnpm@latest; \
    pnpm i

WORKDIR /app/user

ENTRYPOINT ["pnpm", "run", "start:dev"]
