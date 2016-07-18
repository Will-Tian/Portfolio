import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import '../../public/css/styles.css';
import '../../public/css/bootstrap.min.css';
import {HomeComponent} from './home/home.component.ts';
@Component({
  selector: 'portfolio-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [ROUTER_DIRECTIVES, HomeComponent],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    useAsDefault: true
  },
])
export class AppComponent { }