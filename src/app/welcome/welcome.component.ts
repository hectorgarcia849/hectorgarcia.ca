import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {welcomeAnimation} from '../shared/animations';
import {NavigationService} from '../services/navigation.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor() {
  }

}
