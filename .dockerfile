FROM oven/bun:1.0.0

WORKDIR /usr/src/app

COPY . .

RUN bun install

CMD ["bun", "run", "test"]
