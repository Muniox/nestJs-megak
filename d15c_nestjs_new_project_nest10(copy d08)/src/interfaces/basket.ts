import { AddItemDto } from 'src/basket/dto/add-item.dto';

export type AddToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export interface RemoveFromBasketResponse {
  isSuccess: boolean;
}

export type GetBasketResponse = AddItemDto[];

export type GetTotalBasketPriceResponse =
  | number
  | {
      isSuccess: false;
      alternativeBasket: AddItemDto[];
    };
