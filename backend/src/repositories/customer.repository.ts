import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDsDataSource} from '../datasources';
import {Customer, CustomerRelations, Cart} from '../models';
import {CartRepository} from './cart.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly cart_Id: HasManyRepositoryFactory<Cart, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.postgresDS') dataSource: PostgresDsDataSource, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>,
  ) {
    super(Customer, dataSource);
    this.cart_Id = this.createHasManyRepositoryFactoryFor('cart_Id', cartRepositoryGetter,);
    this.registerInclusionResolver('cart_Id', this.cart_Id.inclusionResolver);
  }
}
