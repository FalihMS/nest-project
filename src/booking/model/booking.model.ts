import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Booking extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column({ type: DataType.UUID })
  fieldUid: string;

  @Column
  name: string;

  @Column
  phoneNo: string;

  @Column({ type: DataType.DATEONLY })
  date: string;

  @Column
  time: number;

  @Column
  duration: number;
}
