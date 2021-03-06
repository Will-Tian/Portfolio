import {Component} from '@angular/core';
import {ScrollService} from '../directive-services/scroll.service';
import {BrowserService} from '../browser-services/browser.service';
import {ScrollCollectionDirective} from '../directives/scroll-collection.directive';
import {ScrollItemDirective} from '../directives/scroll-item.directive.ts';
import {NavComponent} from '../nav/nav.component';
import {Home1Component} from './home1.component';
import {Home2Component} from './home2.component';
import {Home3Component} from './home3.component';
import {Home4Component} from './home4.component';

@Component({
  selector: 'home-page',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
  providers: [ScrollService, BrowserService],
  directives: [ScrollCollectionDirective, ScrollItemDirective, NavComponent, Home1Component, Home2Component, Home3Component, Home4Component]
})

export class HomeComponent{
}