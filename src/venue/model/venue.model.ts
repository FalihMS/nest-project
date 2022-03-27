import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Field } from './field.model';

@Table
export class Venue extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  phoneNo: string;

  @Column
  email: string;

  @HasMany(() => Field, { as: 'fields' })
  fields: Field[];
}
