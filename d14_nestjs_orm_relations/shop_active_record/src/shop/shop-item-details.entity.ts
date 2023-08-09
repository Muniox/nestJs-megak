import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "./shop-item.entity";

@Entity()
export class ShopItemDetails extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 15,
    })
    color: string

    @Column()
    width: number

    @OneToOne(type => ShopItem)
    shopItem: ShopItem;

    /* Subprodukt */
    @ManyToOne(type => ShopItem, entity => entity.subShopItems)
    mainShopItem: ShopItem;

    /* Produkt główny */
    @OneToMany(type => ShopItem, entity => entity.mainShopItem)
    subShopItems: ShopItem[];

}