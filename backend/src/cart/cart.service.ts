import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: string, menuItemId: string, quantity: number = 1) {
    const existingCart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!existingCart) {
      return this.prisma.cart.create({
        data: {
          userId,
          items: {
            create: {
              menuItemId,
              quantity,
            },
          },
        },
      });
    } else {
      return this.prisma.cart.update({
        where: { id: existingCart.id },
        data: {
          items: {
            create: {
              menuItemId,
              quantity,
            },
          },
        },
      });
    }
  }

  async removeFromCart(cartItemId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId: cartItemId },
      include: { items: true },
    });

    if (cart) {
      return this.prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            disconnect: { id: cartItemId },
          },
        },
      });
    }
  }

  async getCart(userId: string) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }
}
