import {Component, OnDestroy, OnInit} from '@angular/core';
import {welcomeAnimation} from '../shared/animations';
import {NavigationService} from '../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [ welcomeAnimation]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  state: string;
  routeWillChangeNotifications: Subscription;
  constructor(private navService: NavigationService) {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'home') {
        this.state = 'exit';
      }
    });
  }

  ngOnInit() {
    this.state = 'enter';
  }

  ngOnDestroy() {
    this.routeWillChangeNotifications.unsubscribe();
  }
}
