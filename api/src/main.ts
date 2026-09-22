import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';

async function bootstrap() {
  const envPath = resolve(__dirname, '../.env');
  if (existsSync(envPath)) {
    loadEnvFile(envPath);
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
