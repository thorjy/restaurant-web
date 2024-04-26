import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderController extends Controller {
  @service router;
  @service auth;
  @tracked totalPrice = 0;
  @tracked checkedOut = false;
  @tracked viewCheckoutHistory = false;

  @action
  calculateTotalPrice() {
    this.totalPrice = this.model.reduce((total, orderItem) => {
      return total + orderItem.price * orderItem.quantity;
    }, 0);
  }

  @action
  goBack() {
    this.totalPrice = 0;
    this.checkedOut = false;
    this.viewCheckoutHistory = false;
  }

  @action
  async checkout() {
    if (this.totalPrice == 0) return;
    const user = this.auth.user;
    const userId = user.id;
    const cart = await this.storeToCart(userId, this.totalPrice);
    for (const orderItem of this.model) {
      const { price, dishName, quantity } = orderItem;
      if (quantity) {
        const orderData = {
          price,
          dishName,
          quantity,
          userId,
          cartId: cart.id,
        };

        try {
          const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });
          if (response.ok) {
            console.log(`Order for ${dishName} placed successfully!`);
            this.checkedOut = true;
          } else {
            console.error(
              `Failed to place order for ${dishName}:`,
              response.statusText,
            );
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    }
  }

  @action
  async storeToCart(userId, totalPrice) {
    const cartData = {
      userId,
      totalPrice,
    };
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('successfully stored cart', result);
        return result;
      } else {
        console.error(`ERROR STORING INTO CART`, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  @action
  async viewHistory() {
    this.router.transitionTo('/history');
  }
}
