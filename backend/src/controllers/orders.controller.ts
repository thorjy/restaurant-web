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
import {Orders} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) {}

  @post('/orders')
  @response(200, {
    description: 'Orders model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orders)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrders',
            exclude: ['id'],
          }),
        },
      },
    })
    orders: Omit<Orders, 'id'>,
  ): Promise<Orders> {
    return this.ordersRepository.create(orders);
  }

  @get('/orders/count')
  @response(200, {
    description: 'Orders model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Orders) where?: Where<Orders>): Promise<Count> {
    return this.ordersRepository.count(where);
  }

  @get('/orders')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Orders) filter?: Filter<Orders>): Promise<Orders[]> {
    return this.ordersRepository.find(filter);
  }
}
