FROM node:latest

# build nextjs app
COPY . /app
WORKDIR /app

ARG PORT=3000
EXPOSE $PORT

ENV NODE_ENV=production
ENV time_zone=Asia/Seoul
ENV PORT=$PORT

RUN corepack enable
RUN corepack prepare pnpm
RUN pnpm install --frozen-lockfile --prod

RUN pnpm run build

CMD ["pnpm", "start"]
