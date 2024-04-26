import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ItemComponent extends Component {
  @service store;

  get name() {
    return this.args.item.dishName;
  }

  get price() {
    return this.args.item.price;
  }

  get description() {
    return this.args.item.description;
  }
}
