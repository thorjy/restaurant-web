import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('menu');
  this.route('about');
  this.route('contact');
  this.route('order');
  this.route('login');
  this.route('history');
});
