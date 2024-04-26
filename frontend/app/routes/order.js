import Route from '@ember/routing/route';

export default class OrderRoute extends Route {
  async model() {
    const url = 'http://localhost:3000/menu'; // Correct URL
    const response = await fetch(url);
    return await response.json();
  }
}
