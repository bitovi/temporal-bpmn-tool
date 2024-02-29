import Koa from 'koa';
import Router from '@koa/router';
import koaCors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger'
import fs from 'fs';

const { HTTP_PORT = "8080" } = process.env;

const app = new Koa();
const router = new Router({
  prefix: '/api'
});

app.use(koaLogger());
app.use(
  bodyParser({
    enableTypes: ['json', 'text']
  })
);
app.use(koaCors({}));
app.use(router.routes());

router.put('/diagrams/:filename', async (ctx) => {
  const { filename } = ctx.params;
  const { body } = ctx.request;
  if (typeof body !== "string") {
    throw new Error("Missing body!");
  }
  await fs.promises.writeFile(`./bpmn-examples/${filename}`, body, 'utf8');
  ctx.body = null;
});

router.get('/diagrams/:filename', async (ctx) => {
  const { filename } = ctx.params;
  const result = await fs.promises.readFile(`./bpmn-examples/${filename}`, 'utf8');
  ctx.body = result;
  // ctx.set('access-control-allow-origin', '*');
});

router.get('/diagrams/', async (ctx) => {
  const result = await fs.promises.readdir('./bpmn-examples/');
  ctx.body = result;
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}!`);
});