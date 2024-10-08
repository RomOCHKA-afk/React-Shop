import { Injectable, NotFoundException } from '@nestjs/common';
import { productReturnObject, productReturnObjectFullest } from './return-product.object';
import { NotFoundError, combineLatest } from 'rxjs';
import { promises } from 'dns';
import { ProductDto } from './product.dto';
import { generateSlug } from 'src/utils/generate-slug';
import { PrismaService } from 'src/prisma.service';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.products.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { contains } from 'class-validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService
    ) {}
    
    async getAll(dto: GetAllProductDto={}) {
          const {sort, searchTerm} = dto  

          const prismaSort: Prisma.ProductOrderByWithRelationInput [] = []

          if (sort === EnumProductSort.LOW_PRICE)
            prismaSort.push ({price: 'asc'})
          else if (sort === EnumProductSort.HIGH_PRICE)
            prismaSort.push ({price:'desc'})
          else if (sort === EnumProductSort.OLDEST)
            prismaSort.push ({createdAT:'asc'})
          else
            prismaSort.push({createdAT:'desc'}) 

            const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm? {
                OR: [
                    {
                        category: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {    
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            } : {}

            const {perPage, skip} = this.paginationService.getPagination(dto)

            const products = await this.prisma.product.findMany({
                where: prismaSearchTermFilter,
                orderBy: prismaSort,
                skip,
                take: perPage,
                select: productReturnObject
            })
            return {products, length: await this.prisma.product.count({
                where: prismaSearchTermFilter
            })}
    }

    async byCategory(categorySlug: string) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: productReturnObject
        })

        if (!products) throw new NotFoundException('Products not found!')
            return products
    }


    async byId(id: number) {
      const product = await this.prisma.product.findUnique({
        where: { id },
        select: productReturnObjectFullest,
      });
    
      if (!product) {
        throw new Error('Product not found');
      }
     
      return product;
    }

    async bySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: productReturnObject
        })
    }
    
    
    
    async getSimilar(id:number) {
        const currentProduct = await this.byId(id)

        if (!currentProduct)
            throw new NotFoundException('Current product not found')

        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAT: 'desc'
            },
            select: productReturnObject
        })
    }

    async create () {
        const product = await this.prisma.product.create({
            data: {
                description: '',
                name: '',
                price: 0,
                slug: ''
            }
        })
        return product.id
    }

    async update (id:number, dto:ProductDto) {
        const {description, images, price, name, categoryId} = dto

        return this.prisma.product.update({
            where:{id},
            data:{
                description,
                images, 
                price,
                name,
                slug: generateSlug(name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }

            }
        })
    }

    async delete (id:number) {
        return this.prisma.product.delete ({where: {id}})
    }
    
}
