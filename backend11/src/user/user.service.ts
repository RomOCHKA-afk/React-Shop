import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: selectObject,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavorite(productId: number, userId: number) {
    const user = await this.byId(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const isExists = user.favorites.some((product) => product.id === productId);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: { id: productId },
        },
      },
    });

    return {message:'Success'}
  }
}
