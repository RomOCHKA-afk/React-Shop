// user.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // Ensure PrismaService is included here
  exports: [UserService]
})
export class UserModule {}



