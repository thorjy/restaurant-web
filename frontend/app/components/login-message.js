import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class LoginMessageComponent extends Component {
  @service auth;

  @computed('auth.isAuthenticated')
  get loggedIn() {
    return this.auth.isAuthenticated;
  }
}
