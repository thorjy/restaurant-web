import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HistoryController extends Controller {
  @service router;
  @service auth;
  goBack = () => {
    this.router.transitionTo('/order');
  };
}
