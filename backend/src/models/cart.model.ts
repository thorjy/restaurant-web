import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Customer} from './customer.model';

@model()
export class Cart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'user_id',
    },
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'total_price',
    },
  })
  totalPrice: number;

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
