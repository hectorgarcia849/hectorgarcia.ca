import {Component, OnDestroy, OnInit} from '@angular/core';
import {titleAnimation} from "../shared/animations";
import {NavigationService} from "../services/navigation.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [titleAnimation]
})
export class AboutComponent implements OnInit, OnDestroy {

  state = 'enter';
  routeWillChangeNotifications: Subscription;

  constructor(private navService: NavigationService) {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'about') {
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
