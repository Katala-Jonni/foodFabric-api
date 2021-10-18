import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
// schemas
import { Basket, BasketDocument } from '@app/basket/basket.schema';
import { User, UserDocument } from '@app/user/user.schema';
import { Product, ProductDocument } from '@app/product/product.schema';
// dto
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
// interfaces
import { BasketResponseInterface } from '@app/basket/types/basketResponse.interface';
import { UserType } from '@app/user/types/user.type';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private readonly basketRepository: Model<BasketDocument>,
    @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
    @InjectModel(Product.name) private readonly productRepository: Model<ProductDocument>,
  ) {}

  async create(createBasketDto: CreateBasketDto, user: UserType): Promise<Basket> {
    const currentProduct: Product = await this.productRepository.findById(createBasketDto.productId);
    if (!currentProduct) {
      throw new HttpException('product is not found', HttpStatus.NOT_FOUND);
    }
    try {
      if (user) {
        const currentUser: UserDocument = await this.userRepository.findById(user._id);
        if (currentUser.basketId) {
          const basket: BasketDocument = await this.basketRepository.findById(currentUser.basketId);
          return this.createUserAndLocalBasket(basket, createBasketDto, currentProduct);
        } else {
          const newBasket = await this.createNewBasket(createBasketDto, currentProduct, user);
          currentUser.basketId = newBasket;
          await currentUser.save();
          return newBasket;
        }
      }
      if (!user && createBasketDto.localBasketId) {
        const basket: BasketDocument = await this.basketRepository.findOne({ localBasketId: createBasketDto.localBasketId });
        if (basket) {
          return this.createUserAndLocalBasket(basket, createBasketDto, currentProduct);
        }
      }
      return this.createNewBasket(createBasketDto, currentProduct);
    } catch (e) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const basket = await this.basketRepository
      .findById(id)
      .select({ __v: 0 })
      .exec();
    return basket || null;
  }

  async update(id: string, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  async remove(id: string) {
    return `This action removes a #${id} basket`;
  }

  private async createUserAndLocalBasket(basket: BasketDocument, createBasketDto: CreateBasketDto, currentProduct: Product) {
    const candidate = basket.products.findIndex(b => `${b.productId}` === `${createBasketDto.productId}`);
    if (candidate >= 0) {
      basket.products[candidate].count += createBasketDto.count;
    } else {
      basket.products.push({
        productId: currentProduct,
        count: createBasketDto.count,
      });
    }
    basket.total += currentProduct.price * createBasketDto.count;
    await basket.save();
    return this.basketRepository.findById(`${basket._id}`);
  }

  private async createNewBasket(createBasketDto: CreateBasketDto, currentProduct: Product, user: UserType = null): Promise<Basket> {
    const newBasketUserId = new this.basketRepository({
      total: currentProduct.price * createBasketDto.count,
      products: [
        {
          productId: currentProduct,
          count: createBasketDto.count,
        },
      ],
      localBasketId: user ? null : createBasketDto.localBasketId || uuidv4(),
    });
    await newBasketUserId.save();
    return this.basketRepository.findById(`${newBasketUserId._id}`);
  }

  buildBasketResponse(basket: Basket): BasketResponseInterface {
    return { basket: basket || null };
  }
}
