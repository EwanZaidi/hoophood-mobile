import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
// import { NavController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

@Injectable()
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(team_name, team_id) : void {
    window.localStorage.setItem('team_name', team_name);
    window.localStorage.setItem('team_id', team_id);
    this.isLoginSubject.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout() : void {
    window.localStorage.clear()
    this.isLoginSubject.next(false);
    // this.navCtrl.setRoot(LoginPage);
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }
}