import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddonController } from './addon.controller';
import { AddonService } from './addon.service';

@Module({
  controllers: [AddonController],
  providers: [AddonService, PrismaService],
})
export class AddonModule {}
