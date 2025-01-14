import { Body, Controller, Get, Param, Put } from '@nestjs/common';
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
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.updatePlace(+id, updatePlaceDto);
  }
}
