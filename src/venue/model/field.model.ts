import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Slot } from 'src/slot/model/slot.model';
import { Pricelist } from './pricelist.model';
import { Venue } from './venue.model';

@Table
export class Field extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uid: string;

  @Column
  name: string;

  @Column
  type: string;

  @Column({ defaultValue: 'A' })
  status: string;

  @HasMany(() => Slot, { as: 'slots' })
  slots: Slot[];

  @ForeignKey(() => Venue)
  @Column({ type: DataType.UUID })
  venueUid: string;

  @BelongsTo(() => Venue, { as: 'venue' })
  venue: Venue;

  @ForeignKey(() => Pricelist)
  @Column({ type: DataType.UUID })
  pricelistUid: string;

  @BelongsTo(() => Pricelist, { as: 'pricelist' })
  pricelist: Pricelist;
}
