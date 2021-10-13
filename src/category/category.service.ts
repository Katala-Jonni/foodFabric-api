import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '@app/category/category.schema';
import { Model } from 'mongoose';
import { CategoryResponseInterface } from '@app/category/types/categoryResponse.interface';
import { CategoriesResponseInterface } from '@app/category/types/categoriesResponse.interface';
import slugify from 'slugify';
import { CreateCategoryDto } from '@app/category/dto/createCategory.dto';
import { SearchInterface } from '@app/category/types/search.interface';
import { UpdateCategoryDto } from '@app/category/dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryRepository: Model<CategoryDocument>) {
  }

  async findOne(query: SearchInterface): Promise<Category> {
    return this.categoryRepository.findOne(query)
      .select({
        __v: 0,
      })
      .lean()
      .exec();
  }

  async findAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find()
      .select({
        __v: 0,
      })
      .lean()
      .exec();
  }

  async findOneCategory(slug: string): Promise<Category> {
    return this.findOne({ slug });
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category[]> {
    const categoryByTitle = await this.findOne({ title: createCategoryDto.title });
    const errorResponse = {
      errors: {},
    };
    if (categoryByTitle) {
      errorResponse['title'] = 'has already been taken';
    }

    if (categoryByTitle) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const slug = this.getSlug(createCategoryDto.title);
    const newCategory = new this.categoryRepository({
      ...createCategoryDto,
      slug,
    });
    await newCategory.save();
    return this.findAllCategory();
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, slug: string): Promise<Category> {
    const categoryBySlug = await this.findOne({ slug });
    if (!categoryBySlug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const errorResponse = {
      errors: {},
    };
    const isCategoryBySlug = categoryBySlug && updateCategoryDto.title.toLowerCase() === categoryBySlug.title;
    if (isCategoryBySlug) {
      errorResponse['title'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newSlug = this.getSlug(updateCategoryDto.title);
    return this.categoryRepository.findOneAndUpdate(
      { slug },
      { ...updateCategoryDto, slug: newSlug },
      { new: true },
    ).select({
      __v: 0,
    })
      .lean()
      .exec();
  }

  async deleteCategory() {
    return 'delete category';
  }

  private getSlug(title: string): string {
    const slug = slugify(title, {
      lower: true,
    });
    const randomString = ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    return `${slug}-${randomString}`;
  }

  buildCategoriesResponse(categories: Category[]): CategoriesResponseInterface {
    return { categories };
  }

  buildCategoryResponse(category: Category): CategoryResponseInterface {
    return { category };
  }
}
