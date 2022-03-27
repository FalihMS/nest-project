import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field } from '../../venue/model/field.model';

@Table
export class Slot extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column
  date: string;

  @Column({ defaultValue: 'A' })
  slotTaken: string;

  @Column
  time: number;

  @Column
  bookingPrice: number;

  @ForeignKey(() => Field)
  @Column({ type: DataType.UUID })
  fieldUid: string;

  @BelongsTo(() => Field, { as: 'field' })
  field: Field;
}
