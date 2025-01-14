import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Ваш фронтенд адрес
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Если нужны разные методы
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Если нужно разрешить куки
  };

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
