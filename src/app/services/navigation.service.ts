import {ReplaySubject} from "rxjs/ReplaySubject";

export class NavigationService {
  private navSubject = new ReplaySubject(1);
  routeChange$ = this.navSubject.asObservable();

  broadcastRouteChange(newRoute: string) {
    this.navSubject.next(newRoute);
  }
}
