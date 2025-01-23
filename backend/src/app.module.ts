import { Module } from '@nestjs/common';
import { PlaceModule } from './place/place.module';
import { MenuModule } from './menu/menu.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { AddonModule } from './addon/addon.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [PlaceModule, MenuModule, MenuCategoryModule, MenuItemModule, AddonModule, AuthModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
