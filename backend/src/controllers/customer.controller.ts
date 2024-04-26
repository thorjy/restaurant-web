import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Getter,
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
  HttpErrors,
} from '@loopback/rest';
import {Customer, CustomerRelations} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) {}

  @post('/customer/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomer',
            exclude: ['id'],
          }),
        },
      },
    })
    credentials: Omit<Customer, 'id'>,
  ): Promise<{customer: Customer & CustomerRelations}> {
    if (!credentials.username || !credentials.password) {
      throw new HttpErrors.BadRequest('Missing username or password');
    }
    const customer = await this.customerRepository.findOne({
      where: {username: credentials.username, password: credentials.password},
    });
    if (!customer) {
      throw new HttpErrors.Unauthorized('Invalid username or password');
    }
    return {customer};
  }

  @post('/customers')
  @response(200, {
    description: 'Customer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomer',
            exclude: ['id'],
          }),
        },
      },
    })
    customer: Omit<Customer, 'id'>,
  ): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  @get('/customers')
  @response(200, {
    description: 'Array of Customer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
