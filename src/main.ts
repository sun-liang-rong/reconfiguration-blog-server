import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import * as spdy from 'spdy';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
console.log(
  join(__dirname, '../https/8268414_www.sunsunblog.top.key'),
  '__dirname',
);
const httpsOptions = {
  key: fs.readFileSync(
    join(__dirname, '../https/8268414_www.sunsunblog.top.key'),
  ),
  cert: fs.readFileSync(
    join(__dirname, '../https/8268414_www.sunsunblog.top.pem'),
  ),
};
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/static/',
  });
  console.log(
    join(__dirname, '..', 'upload'),
    "join(__dirname, '..', 'upload')",
  );
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.init();
  // http.createServer(server).listen(3000);
  spdy.createServer(httpsOptions, server).listen(5000);
}
bootstrap();
