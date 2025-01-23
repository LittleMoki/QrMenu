import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Загрузка секретного ключа из .env файла
      signOptions: { expiresIn: '1h' }, // Настройка срока действия токена
    }),
  ],
  exports: [JwtModule], // Экспорт для использования JwtModule в других модулях
})
export class AuthModule {}
