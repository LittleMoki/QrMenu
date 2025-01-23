import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { PrismaService } from '../src/prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const adminPhone = process.env.ADMIN_PHONE;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Admin Phone:', adminPhone); // Проверяем, что переменная успешно загружается
    console.log('Admin Password:', adminPassword); // Проверяем, что переменная успешно загружается

    if (!adminPhone || !adminPassword) {
      console.error('Администраторские данные отсутствуют в .env');
      return;
    }

    const existingAdmin = await this.prisma.user.findUnique({
      where: { phone: adminPhone },
    });

    console.log('Existing Admin:', existingAdmin); // Проверяем, находит ли пользователя по телефону

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await this.prisma.user.create({
        data: {
          firstName: 'Admin',
          secondName: 'User',
          phone: adminPhone,
          password: hashedPassword,
          role: 'admin',
        },
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}
