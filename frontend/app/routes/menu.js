import Route from '@ember/routing/route';

export default class MenuRoute extends Route {
  async model() {
    const url = 'http://localhost:3000/menu'; // Correct URL
    const response = await fetch(url);
    return await response.json();
  }
}
