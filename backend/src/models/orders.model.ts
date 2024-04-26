import {Entity, model, property} from '@loopback/repository';

@model()
export class Orders extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'dish_name',
    },
  })
  dishName: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

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
      columnName: 'cart_id',
    },
  })
  cartId: number;

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;
