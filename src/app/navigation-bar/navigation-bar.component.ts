import {Component, OnDestroy, OnInit} from '@angular/core';
import { navBarAnimation} from '../shared/animations';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {NavigationService} from '../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {routes} from '../app-routing.module';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  animations: [
      navBarAnimation
  ]
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  state;
  routerNavEventSubscription: Subscription;
  routes = routes;
  selectedPath;
  constructor(private router: Router, private navService: NavigationService) {
  }

  ngOnInit() {
    this.routerNavEventSubscription = this.router
      .events
      .filter((event) => event instanceof NavigationStart)
      .subscribe(
        (nav: any) => {
          const newPath = nav.url.substr(1).split('/', 1)[0].split('?', 1)[0];
          this.selectedPath = newPath;
          this.navService.broadcastRouteChange(newPath);
          const newState = this.getAnimationStateUpdate(newPath);
          this.setAnimationState(newState);
        });
  }

  ngOnDestroy() {
    this.routerNavEventSubscription.unsubscribe();
  }

  onRouteSelected(selectedRoute: {path: string, state: string}) {
    /*Timer delay used on route selection as Angular framework
    has a bug that does not allow exiting shared using the
    routerLink directive. */
    const path = selectedRoute.path.split('/', 1)[0];
    this.navService.broadcastRouteChange(path);
    const timer = Observable.timer(500);
    timer.subscribe(() => {
      this.setAnimationState(selectedRoute.state);
      this.router.navigate([`/${selectedRoute.path}`]);
    });
  }

  setAnimationState(newState: string) {
    this.state = newState;
  }

  getAnimationStateUpdate(newPath: string) {
    return this.routes.find(function(route) {
      return route.path === newPath;
    }).state;
  }
}
