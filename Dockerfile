FROM oven/bun:latest

# build nextjs app
COPY . /app
WORKDIR /app

ARG PORT=3000
EXPOSE $PORT

ENV NODE_ENV=production
ENV time_zone=Asia/Seoul
ENV PORT=$PORT

RUN bun install --frozen-lockfile

RUN bun run build

CMD ["bun", "run", "--bun", "start"]
