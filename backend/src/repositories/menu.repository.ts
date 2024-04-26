import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDsDataSource} from '../datasources';
import {Menu, MenuRelations} from '../models';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.id,
  MenuRelations
> {
  constructor(
    @inject('datasources.postgresDS') dataSource: PostgresDsDataSource,
  ) {
    super(Menu, dataSource);
  }
}
