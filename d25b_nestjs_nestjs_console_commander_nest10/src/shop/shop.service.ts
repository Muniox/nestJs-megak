import { Injectable, Post } from '@nestjs/common';
import { ShopItem } from './shop-item.entity';
import { AddProductDto } from './dto/add-product.dto';
import { ShopItemInterface } from '../interfaces/shop';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from 'src/utils/storage';

@Injectable()
export class ShopService {
  filter(shopItem: ShopItem): ShopItemInterface {
    const { id, price, name, description } = shopItem;
    return { id, price, name, description };
  }

  async getItems(): Promise<ShopItemInterface[]> {
    return (await ShopItem.find()).map(this.filter);
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

  async addProduct(
    req: AddProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<ShopItemInterface> {
    const photo = files?.photo?.[0] ?? null;
    try {
      console.log({ photo });

      const shopItem = new ShopItem();
      shopItem.name = req.name;
      shopItem.description = req.description;
      shopItem.price = req.price;

      if (photo) {
        shopItem.photoFn = photo.filename;
      }

      await shopItem.save();

      return this.filter(shopItem);
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(
            path.join(storageDir(), 'product-photos', photo.filename),
          );
        }
      } catch (e2) {}

      throw e;
    }
  }

  async getPhoto(id: string, res: any) {
    try {
      const one = await ShopItem.findOne({ where: { id } });

      if (!one) {
        throw new Error('No object found!');
      }

      if (!one.photoFn) {
        throw new Error('No photo in this entity');
      }

      res.sendFile(one.photoFn, {
        root: path.join(storageDir(), 'profuct-photos/'),
      });
    } catch (e) {
      res.json({ error: e.message });
    }
  }
}
