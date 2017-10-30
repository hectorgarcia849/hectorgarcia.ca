import { Component, OnInit, OnDestroy } from '@angular/core';
import {titleAnimation} from '../shared/animations';
import {NavigationService} from "../services/navigation.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [
    titleAnimation
  ]
})
export class PortfolioComponent implements OnInit, OnDestroy {
  state = 'enter';
  routeWillChangeNotifications: Subscription;
  constructor(private navService: NavigationService) {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'portfolio') {
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
