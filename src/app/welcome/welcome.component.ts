import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {welcomeAnimation} from '../shared/animations';
import {NavigationService} from '../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [ welcomeAnimation]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  state: string;
  routeWillChangeNotifications: Subscription;
  email = '';
  password = '';
  isLoggedInSubscription: Subscription;
  isLoggedIn: boolean;
  public modalRef: BsModalRef;
  constructor(private navService: NavigationService, private modalService: BsModalService, private authService: AuthenticationService) {
    this.routeWillChangeNotifications = this.navService.routeChange$.subscribe((route) => {
      if (route !== 'home') {
        this.state = 'exit';
      }
    });
  }

  ngOnInit() {
    this.state = 'enter';
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.routeWillChangeNotifications.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }

  openLogin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onLogin() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (res) => {
          const token = JSON.stringify(res['token']);
          sessionStorage.setItem('token', token);
          this.authService.updateLoggedIn(true);
        });
  }

  onLogout() {
    sessionStorage.clear();
    this.authService.updateLoggedIn(false);
  }
}
