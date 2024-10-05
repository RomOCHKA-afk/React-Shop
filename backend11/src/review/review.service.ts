import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './review.dto';
import { generateSlug } from 'src/utils/generate-slug';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  
  async getAll(){
    return this.prisma.review.findMany({
      orderBy: {
        createdAT: 'desc'
      },
      select: returnReviewObject
    })
  }
  
  
  async create(userId: number, dto: ReviewDto, productId: number) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }
  

  async getAverageValueProductId(productId: number) {
    return this.prisma.review.aggregate({
        where: { productId },
        _avg: {rating: true}
      })
      .then(data=>data._avg)
    }
 







  
  



}

