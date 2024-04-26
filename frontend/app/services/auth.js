import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @service router;
  @tracked isAuthenticated = false;
  user = {};

  async login(username, password) {
    try {
      const response = await fetch('http://localhost:3000/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password in the correct format
      });
      if (response.ok) {
        const data = await response.json();
        this.isAuthenticated = true;
        this.user = data.customer; // Assuming the customer data is returned as part of the 'customer' property
        this.router.transitionTo('index');
      } else {
        throw new Error('Wrong username or password');
      }
    } catch (error) {
      throw new Error('Wrong user, no such user');
    }
  }
}
