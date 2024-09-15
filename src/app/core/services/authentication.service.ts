import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    return token ? true : false;
  }

}
