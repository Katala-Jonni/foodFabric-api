import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketResponseInterface } from '@app/basket/types/basketResponse.interface';
import { User } from '@app/user/decorators/user.decorator';
import { UserType } from '@app/user/types/user.type';

@Controller('api/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('basket') createBasketDto: CreateBasketDto,
    @User() user: UserType
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.create(createBasketDto, user);
    return this.basketService.buildBasketResponse(basket);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.findOne(id);
    return this.basketService.buildBasketResponse(basket);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body('basket') updateBasketDto: UpdateBasketDto,
  // ): Promise<BasketResponseInterface> {
  //   const basket = await this.basketService.update(id, updateBasketDto);
  //   return this.basketService.buildBasketResponse(basket);
  // }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<null> {
    await this.basketService.remove(id);
    return null;
  }
}
