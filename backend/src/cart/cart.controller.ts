import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(
      createCartDto.userId,
      createCartDto.menuItemId,
      createCartDto.quantity,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.getCart(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }
}
