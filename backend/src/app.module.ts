import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AddonModule } from './addon/addon.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuModule } from './menu/menu.module';
import { PlaceModule } from './place/place.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    PlaceModule,
    MenuModule,
    MenuCategoryModule,
    MenuItemModule,
    AddonModule,
    AuthModule,
    CartModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',  // Путь для доступа, добавлен слэш в конце
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'public'), // Указываем путь к папке public
      serveRoot: '/public', // Путь, по которому будет доступен файл
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
