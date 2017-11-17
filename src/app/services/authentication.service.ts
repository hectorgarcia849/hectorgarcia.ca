
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class AuthenticationService {
  private url = 'http://hectorgarcia.herokuapp.com';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();
  constructor(private http: HttpClient) {
  }

  updateLoggedIn(state: boolean) {
    this.loggedInSubject.next(state);
  }
  login(email: string, password: string) {
    const body = JSON.stringify({email, password});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/services/users/login`, body, {headers});
  }
}
