import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthenticationService) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.authService.updateLoggedIn(true);
    }
  }

}
