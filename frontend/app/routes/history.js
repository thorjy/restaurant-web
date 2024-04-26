import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HistoryRoute extends Route {
  @service auth;

  async model() {
    const userId = this.auth.user.id;
    const url = `http://localhost:3000/cart/${userId}`;
    const response = await fetch(url);
    return await response.json();
  }
}
