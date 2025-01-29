import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  adminPhone = process.env.ADMIN_PHONE;
  adminPassword = process.env.ADMIN_PASSWORD;

  async login(phone: string, password: string) {
    const existingAdmin = await this.prisma.user.findUnique({
      where: { phone: this.adminPhone },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(this.adminPassword, 10);
      await this.prisma.user.create({
        data: {
          firstName: 'Admin',
          secondName: 'User',
          phone: this.adminPhone,
          password: hashedPassword,
          role: 'admin',
        },
      });
    }

    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Некорректный номер телефона или пароль');
    }
    
    const payload = {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role, // Добавляем роль
    };
    const token = this.jwtService.sign(payload);

    return {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role,
      accessToken: token,
    };
  }

  async register(data: {
    firstName: string;
    secondName: string;
    phone: string;
    password: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { phone: data.phone },
    });

    if (existingUser) {
      throw new ConflictException('Телефон уже зарегистрирован');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        secondName: data.secondName,
        phone: data.phone,
        password: hashedPassword,
        role: 'user', // По умолчанию создаем обычного пользователя
      },
    });
    const payload = {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role,
      accessToken: token,
    };
  }

  // Новый метод для проверки токена
  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token); // Расшифровка токена
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });
      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      return {
        id: user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        role: user.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Неверный токен');
    }
  }
}
