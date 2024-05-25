import { Column, Model, Table, PrimaryKey } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}
