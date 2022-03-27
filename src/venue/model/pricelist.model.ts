import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field } from './field.model';

@Table
export class Pricelist extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column
  name: string;

  @HasMany(() => Field, { as: 'field' })
  field: Field;

  @HasMany(() => WeeklyPricelist, { as: 'weeklyPricelist' })
  weeklyPricelist: WeeklyPricelist[];
}

@Table
export class WeeklyPricelist extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column
  name: string;

  @Column
  dayStart: number;

  @Column
  dayEnd: number;

  @HasMany(() => DailyPricelist, { as: 'dailyPricelist' })
  dailyPricelist: DailyPricelist[];

  @ForeignKey(() => Pricelist)
  @Column({ type: DataType.UUID })
  PricelistUid: string;

  @BelongsTo(() => Pricelist, { as: 'Pricelist' })
  Pricelist: Pricelist;
}

@Table
export class DailyPricelist extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column
  name: string;

  @Column
  timeStart: number;

  @Column
  timeEnd: number;

  @Column
  priceAmount: number;

  @ForeignKey(() => WeeklyPricelist)
  @Column({ type: DataType.UUID })
  weeklyPricelistUid: string;

  @BelongsTo(() => WeeklyPricelist, { as: 'weeklyPricelist' })
  weeklyPricelist: WeeklyPricelist;
}
