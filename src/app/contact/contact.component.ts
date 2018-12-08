import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {titleAnimation} from '../shared/animations';
import {Subscription} from 'rxjs/index';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [titleAnimation]
})
export class ContactComponent implements OnInit, OnDestroy {

  state = 'enter';
  routeWillChangeNotifications: Subscription;
  constructor(private navService: NavigationService) {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'contact') {
        this.state = 'exit';
      }
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.routeWillChangeNotifications.unsubscribe();
  }
}
