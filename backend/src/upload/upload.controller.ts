import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdirSync } from 'fs'
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('upload')
export class UploadController {
  @Get('photos')
  getPhotos() {
    const path = join(__dirname, '..', 'uploads');
    const files = readdirSync(path); // Читаем файлы из папки
    return files.map((file) => ({
      filename: file,
      url: `/uploads/${file}`, // Генерируем URL
    }));
  }
  @Post('photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Папка для сохранения файлов
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Файл успешно загружен',
      filename: file.filename,
    };
  }
}
