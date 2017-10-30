import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NavigationService} from '../services/navigation.service';
import {titleAnimation} from '../shared/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [titleAnimation]
})
export class BlogComponent implements OnInit, OnDestroy {

  state = 'enter';
  routeWillChangeNotifications: Subscription;
  constructor(private navService: NavigationService) {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'articles') {
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
