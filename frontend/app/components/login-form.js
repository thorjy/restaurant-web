import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginComponent extends Component {
  @service auth;
  @tracked wrongUser = false;

  login = async (event) => {
    event.preventDefault();

    const username = event.target.querySelector('input[id="username"]').value;
    const password = event.target.querySelector('input[id="password"]').value;

    try {
      await this.auth.login(username, password);
      this.wrongUser = false;
    } catch (error) {
      this.wrongUser = true;
    }
  };
}
