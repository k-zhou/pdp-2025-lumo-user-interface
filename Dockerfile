FROM denoland/deno:latest

WORKDIR /app

COPY package.json .

RUN DENO_FUTURE=1 deno install

COPY node_modules/@pyscript/core/dist public/pyscript

RUN mkdir -p public/micropython

COPY node_modules/@micropython/micropython-webassembly-pyscript/micropython.* public/micropython/

COPY . .

CMD [ "run", "dev", "--host" ]