if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}
import * as doteenv from 'dotenv';

doteenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
