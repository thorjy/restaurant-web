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
import {Menu} from '../models';
import {MenuRepository} from '../repositories';

export class MenuController {
  constructor(
    @repository(MenuRepository)
    public menuRepository: MenuRepository,
  ) {}

  @post('/menu')
  @response(200, {
    description: 'Menu model instance',
    content: {'application/json': {schema: getModelSchemaRef(Menu)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {
            title: 'NewMenu',
            exclude: ['id'],
          }),
        },
      },
    })
    menu: Omit<Menu, 'id'>,
  ): Promise<Menu> {
    return this.menuRepository.create(menu);
  }

  @get('/menu/count')
  @response(200, {
    description: 'Menu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Menu) where?: Where<Menu>): Promise<Count> {
    return this.menuRepository.count(where);
  }

  @get('/menu')
  @response(200, {
    description: 'Array of Menu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Menu, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Menu[]> {
    return this.menuRepository.find();
  }
}
