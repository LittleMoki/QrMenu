import { Module } from '@nestjs/common';
import { PlaceModule } from './place/place.module';
import { MenuModule } from './menu/menu.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';

@Module({
  imports: [PlaceModule, MenuModule, MenuCategoryModule, MenuItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
