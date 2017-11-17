import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NavigationService} from '../services/navigation.service';
import {titleAnimation} from '../shared/animations';
import {AuthenticationService} from '../services/authentication.service';
import {ArticlesService} from '../services/articles.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [titleAnimation]
})
export class BlogComponent implements OnInit, OnDestroy {
  state = 'enter';
  routeWillChangeNotifications: Subscription;
  isLoggedInSubscription: Subscription;
  topicsSubscription: Subscription;
  isLoggedIn: boolean;
  constructor(private navService: NavigationService,
              private authService: AuthenticationService,
              private articlesService: ArticlesService) {

  }
  ngOnInit() {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'articles') {
        this.state = 'exit';
      }
    });
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.routeWillChangeNotifications.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }
}

