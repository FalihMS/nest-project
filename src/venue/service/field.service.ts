/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from '../model/field.model';
import {
} from '../model/pricelist.model';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field)
    private fieldModel: typeof Field,
  ) {}

  async findFields(uid: string): Promise<Field[]> {
    const field = await this.fieldModel.findAll({
      attributes: ['uid', 'pricelistUid', 'name', 'type', 'status'],
      where: { venueUid: uid },
    });

    return field;
  }

}
