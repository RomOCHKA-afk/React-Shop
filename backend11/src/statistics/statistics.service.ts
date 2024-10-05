import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
    getMainStatistics(id: number) {
      throw new Error('Method not implemented.');
    }
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    async getMain (userId: number) {
        const user = await this.userService.byId(userId,{
            order: {
                select: {
                    items: {
                        select: {
                            price: true
                        }
                    }
                }
            },
            reviews:true
        })
        return user.order
        return [
            {
                name: 'Orders',
                value: user.order.length
            },
            {
                name: 'Reviews',
                value: user.reviews.length
            },
            {
                name: 'Favorites',
                value: user.favorites.length
            },
            {
                name: 'Total amount',
                value: 1000
            }
            
        ]
    }

}
