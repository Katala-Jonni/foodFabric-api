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
  ) {
  }

  async create(createBasketDto: CreateBasketDto, user: UserType): Promise<Basket> {
    const currentProduct: Product = await this.productRepository.findById(createBasketDto.productId);
    if (!currentProduct) {
      throw new HttpException('product is not found', HttpStatus.NOT_FOUND);
    }
    try {
      if (user) {
        const currentUser: UserDocument = await this.userRepository.findById(user._id);
        if (currentUser.basketId) {
          const basket: BasketDocument = await this.basketRepository.findById(user.basketId);
          return this.createBasket(basket, createBasketDto, currentProduct);
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
          return this.createBasket(basket, createBasketDto, currentProduct);
        }
      }
      return this.createNewBasket(createBasketDto, currentProduct);
    } catch (e) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findBasket(localBasketId: string, user: UserType): Promise<Basket> {
    try {
      return user
        ? await this.basketRepository.findById(user.basketId)
        : await this.basketRepository.findOne({ localBasketId });
    } catch (e) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    basketId: string,
    productId: string,
    updateBasketDto: UpdateBasketDto,
    user: UserType,
    inc: string,
  ): Promise<Basket> {
    if (user) {
      return this.updatePlusMinus({ _id: `${user.basketId}` }, productId, updateBasketDto, inc);
    } else {
      return this.updatePlusMinus({ localBasketId: basketId }, productId, updateBasketDto, inc);
    }
  }

  async removeProduct(basketId: string, productId: string, user: UserType): Promise<Basket> {
    if (user && !user.basketId) {
      return null;
    }
    const param = user ? { _id: `${user.basketId}` } : { localBasketId: basketId };
    const basket = await this.deleteProduct(param, productId);
    if (!basket.products.length) {
      user && await this.userRepository.findByIdAndUpdate(user._id, { basketId: null });
      await this.deleteBasket(param);
      return null;
    }
    return basket;
  }

  async remove(basketId: string, user: UserType): Promise<null> {
    const param = user ? { _id: `${user.basketId}` } : { localBasketId: basketId };
    if (user && user.basketId) {
      await this.userRepository.findByIdAndUpdate(user._id, { basketId: null });
    }
    await this.deleteBasket(param);
    return null;
  }

  private async createBasket(
    basket: BasketDocument,
    createBasketDto: CreateBasketDto,
    currentProduct: Product,
  ): Promise<Basket> {
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

  private async createNewBasket(
    createBasketDto: CreateBasketDto,
    currentProduct: Product,
    user: UserType = null,
  ): Promise<Basket> {
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

  private async updatePlusMinus(
    param: { _id?: string, localBasketId?: string },
    productId: string,
    updateBasketDto: UpdateBasketDto,
    inc: string,
  ): Promise<Basket> {
    const basket: BasketDocument = await this.searchBasket(param);
    if (!basket) {
      return null;
    }
    const productIdx: number = basket.products.findIndex((p: { count: number, productId: ProductDocument }) => {
      return `${p.productId._id}` === productId;
    });
    if (!basket.products[productIdx]) {
      return basket;
    }
    if (inc === 'plus') {
      basket.products[productIdx].count += +updateBasketDto.count;
      basket.total += basket.products[productIdx].productId.price * +updateBasketDto.count;
    } else if (inc === 'minus') {
      basket.products[productIdx].count -= +updateBasketDto.count;
      if (basket.products[productIdx].count < 1) {
        basket.products[productIdx].count += +updateBasketDto.count;
      } else {
        basket.total -= basket.products[productIdx].productId.price * +updateBasketDto.count;
      }
    }
    await basket.save();
    return basket;
  }

  private async deleteProduct(param: { _id?: string, localBasketId?: string }, productId): Promise<Basket> {
    const basket: BasketDocument = await this.searchBasket(param);
    if (!basket) {
      return null;
    }
    const productIdx: number = basket.products.findIndex((p: { count: number, productId: ProductDocument }) => {
      return `${p.productId._id}` === productId;
    });
    if (!basket.products[productIdx]) {
      return basket;
    }
    basket.total -= basket.products[productIdx].count * basket.products[productIdx].productId.price;
    basket.products.splice(productIdx, 1);
    await basket.save();
    return basket;
  }

  private async deleteBasket(param: { _id?: string, localBasketId?: string }): Promise<void> {
    await this.basketRepository.findOneAndDelete(param);
  }

  private async searchBasket(param: { _id?: string, localBasketId?: string }): Promise<BasketDocument> {
    return await this.basketRepository
      .findOne(param)
      .populate('products.productId')
      .exec();
  }

  buildBasketResponse(basket?: Basket): BasketResponseInterface {
    return { basket: basket || null };
  }
}
