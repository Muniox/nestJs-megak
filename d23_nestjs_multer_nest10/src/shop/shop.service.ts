import { Injectable } from '@nestjs/common';
import { ShopItem } from './shop-item.entity';
import { AddProductDto } from './dto/add-product.dto';
import { ShopItemInterface } from '../interfaces/shop';

@Injectable()
export class ShopService {
  async getItems(): Promise<ShopItem[]> {
    return ShopItem.find();
  }

  async hasItem(name: string): Promise<boolean> {
    return (await this.getItems()).some((item) => item.name === name);
  }

  async getPrice(name: string): Promise<number> {
    return (await this.getItems()).find((item) => item.name === name).price;
  }

  async getOneItem(id: string): Promise<ShopItem> {
    return await ShopItem.findOneBy({ id });
  }

  async addProduct(req: AddProductDto): Promise<ShopItemInterface> {
    console.log(req);
    return {
      name: '',
      description: '',
      price: 1,
    };
  }
}
