import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http : HttpClient){}

  register(user: User): any {
    return this.http.post<User>('http://localhost:8080/api/users/register', user, httpHeaders)
  }

  login(user: User): any {
    let res = this.http.post(`http://localhost:8080/api/users/login`, user, httpHeaders)

    return res.pipe(
      map(data => {
        if(data['token']){
          localStorage.setItem('auth-token', data['token']) 
          return true // success in logging in
        }else{
          return false // unable to login
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('auth-token')
  }
}
