import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...roles: string[]) => SetMetadata('roles', roles);

// user.decorator.ts

import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
  // Your implementation to extract current user from request
});

import { UserDto } from './user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}



  
  
  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  }


@UsePipes(new ValidationPipe())
@HttpCode(200)
@Auth()
@Put('profile')
async getNewTokens(@CurrentUser('id') id: number, @Body() dto: UserDto) {
  return this.userService.updateProfile(id, dto); // Provide both arguments
}

  
  @Auth()
  @HttpCode(200)
  @Patch('profile/favorites/:productId')
  async toggleFavorite(@Param('productId') productId: string, @CurrentUser('id') id: number) {
  const numericProductId = parseInt(productId, 10); // Convert string to number
    return this.userService.toggleFavorite(id, numericProductId);
  }
}
