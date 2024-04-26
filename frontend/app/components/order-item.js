import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class OrderItemComponent extends Component {
  @tracked quantity = 0;

  get name() {
    return this.args.item.dishName;
  }
  get price() {
    return this.args.item.price;
  }
  get description() {
    return this.args.item.description;
  }

  @action
  async incrementQuantity() {
    this.quantity++;
    this.args.item.quantity += 1;
    this.args.calculateTotalPrice();
  }

  @action
  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.args.item.quantity -= 1;
      this.args.calculateTotalPrice();
    }
  }
}
