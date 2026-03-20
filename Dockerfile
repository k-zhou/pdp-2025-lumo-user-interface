FROM denoland/deno:latest

WORKDIR /app

COPY package.json .

RUN DENO_FUTURE=1 deno install

COPY . .

CMD [ "run", "dev", "--host" ]