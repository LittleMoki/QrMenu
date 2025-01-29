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
      rootPath: join(process.cwd(), 'uploads'), 
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'frontend', 'public'), 
      serveRoot: '/public',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
