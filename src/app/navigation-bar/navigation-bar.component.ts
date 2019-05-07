import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {navBarAnimation} from '../shared/animations';
import {NavigationStart, Router} from '@angular/router';
import {NavigationService} from '../services/navigation.service';
import {routes} from '../app-routing.module';
import {Subscription} from 'rxjs/Rx';

import {timer} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
// import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  state;
  isLoggedInSubscription: Subscription;
  isLoggedIn: boolean;
  email = '';
  password = '';
  connectionFailure: boolean;
  incorrectCredentials: boolean;
  public modalRef: BsModalRef;


  constructor(private router: Router,
              private modalService: BsModalService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {

    this.isLoggedInSubscription = this.authService
      .isLoggedIn$
      .subscribe(
        (isLoggedIn) => this.isLoggedIn = isLoggedIn);
  }


  openLogin(template: TemplateRef<any>) {
    this.incorrectCredentials = false;
    this.connectionFailure = false;
    this.modalRef = this.modalService.show(template);
  }

  onLogin() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (res) => {
          const token = JSON.stringify(res['token']);
          sessionStorage.setItem('token', token);
          this.authService.updateLoggedIn(true);
        },
        (err) => {
          const incorrectCredentials = 404;
          if (err.status === incorrectCredentials) {
            this.incorrectCredentials = true;
          } else {
            this.connectionFailure = true;
          }
        }
      );
  }

  onLogout() {
    sessionStorage.clear();
    this.authService.updateLoggedIn(false);
  }

  scrollToElement(elementId: string) {
    const e = document.querySelector('#' + elementId);
    if (e) {
      e.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
