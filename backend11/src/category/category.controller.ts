import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/user/user.controller';
import { CategoryDto } from './category.dto';
import { async } from 'rxjs';
import { id_ID } from '@faker-js/faker';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug:string) {
    return this.categoryService.bySlug(slug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id:string) {
    return this.categoryService.byId(+id)
  }


@HttpCode(200)
@Auth()
@Post(':id')
async create() {
  return this.categoryService.create()
}


@UsePipes(new ValidationPipe())
@HttpCode(200)
@Auth()
@Put(':id')
async update(@Param('id') id: string, @Body() dto: CategoryDto) {
  return this.categoryService.update(+id,dto)
}

  
@HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }

}



