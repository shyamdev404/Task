import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { PriceOption } from "./service.priceoption.entity";

@Table({
  timestamps: false,
})
export class Service extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  category_id: number;

  @Column
  service_name: string;

  @Column
  type: string;

  @Column
  price_options: string;
}
