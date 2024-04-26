import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cart} from '../models';
import {CartRepository, OrdersRepository} from '../repositories';

export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) {}

  @post('/cart')
  @response(200, {
    description: 'Cart model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cart)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCart',
            exclude: ['id'],
          }),
        },
      },
    })
    cart: Omit<Cart, 'id'>,
  ): Promise<Cart> {
    return this.cartRepository.create(cart);
  }

  @get('/cart/count')
  @response(200, {
    description: 'Cart model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Cart) where?: Where<Cart>): Promise<Count> {
    return this.cartRepository.count(where);
  }

  @get('/cart/{userId}')
  @response(200, {
    description: 'Array of Cart model instances of the selected user',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cart, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.path.number('userId') id: number): Promise<any> {
    const result = await this.cartRepository.find({
      where: {
        userId: id,
      },
    });
    const object = await Promise.all(
      result.map(async cart => {
        const orders = await this.ordersRepository.find({
          where: {
            cartId: cart.id,
          },
        });
        return {cart, orders};
      }),
    );
    return object;
  }
}
