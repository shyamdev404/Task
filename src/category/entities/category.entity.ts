import { Column, Model, Table, PrimaryKey } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class Category extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;
}
