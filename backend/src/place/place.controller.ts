import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  findAll() {
    return this.placeService.getPlace();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('bgImage', {
      storage: diskStorage({
        destination: '../frontend/public', // Путь к папке для сохранения файлов
        filename: (req, file, callback) => {
          const originalName = file.originalname;
          callback(null, originalName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
    @UploadedFile() file: Express.Multer.File, // Добавлено
  ) {
    // Если файл был загружен, добавляем его путь в DTO
    if (file) {
      updatePlaceDto.bgImage = `/${file.filename}`;
    }

    // Обновляем место
    return await this.placeService.updatePlace(id, updatePlaceDto);
  }
}
