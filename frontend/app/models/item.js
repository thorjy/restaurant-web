import Model, { attr } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') dishName;
  @attr('string') price;
  @attr('string') description;
}
