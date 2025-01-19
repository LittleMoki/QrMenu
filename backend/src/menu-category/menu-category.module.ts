import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MenuCategoryController } from './menu-category.controller';
import { MenuCategoryService } from './menu-category.service';

@Module({
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, PrismaService],
})
export class MenuCategoryModule {}
