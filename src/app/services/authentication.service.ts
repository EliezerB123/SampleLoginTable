import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;


  constructor(private http: HttpClient) {
      const cachedUser = localStorage.getItem('currentUser');
      if (cachedUser){
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(cachedUser));
      } else {
        this.currentUserSubject = new BehaviorSubject<any>(undefined);
      }
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    //TODO: Note here we would make an HTTP post request to get a valid token. 
    //Obviously since we have no backend, we simply accept "Password" as correct.
    const obs = new Observable((observer)=> {
      if (password == 'password'){
        const user = {user: username, token: 'ASDVADSVSfasdfaddf'};
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        observer.next(user);
      }
    });
    return obs;
  }

  logout() {
    // remove user from local storage and set current user to null
    console.log('Logging out.');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
