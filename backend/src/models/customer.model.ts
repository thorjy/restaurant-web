import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cart, CartWithRelations} from './cart.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Cart, {keyTo: 'userId'})
  cart_Id: Cart[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  carts: CartWithRelations;
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
