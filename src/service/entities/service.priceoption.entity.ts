// PriceOption model
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import { Service } from "./service.entity";
// import { Service } from "./service.entity";

@Table({
  timestamps: false,
})
export class PriceOption extends Model {
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Service)
  @Column
  service_id: number;

  @Column
  duration: string;

  @Column
  price: number;

  @Column
  type: string;

  @BelongsTo(() => Service)
  service: Service;
}
