FROM oven/bun

COPY . /app

WORKDIR /app

RUN bun install 

# i think i don't need the env
ENV NODE_ENV production

CMD ["bun", "src/index.ts"]
