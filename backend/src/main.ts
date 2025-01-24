import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://sentai.uz',
      'https://www.sentai.uz',
      'http://31.128.46.248:5173',
    ], // Адрес фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
