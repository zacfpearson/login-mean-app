import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {User} from '../home/user.model';

@Injectable()
export class DatasService {

  constructor(private http: HttpClient){
  }

  addUser(user: User){
    return this.http.post<{message: string, obj: User}>('/api/user/signup',user)
        .pipe(
          map(
            response => response,
            err => err
            )
        );
  }

  signIn(user: User){
    return this.http.post<{message: string, token: string, userId: string}>('/api/user/signin',user)
        .pipe(
          map(
            response => response,
            err => err
            )
        );
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  deleteUser(userID: string){
    const token = localStorage.getItem('token')
        ? '?token='+localStorage.getItem('token')
        : '';
    return this.http.delete<User>('/api/user/deleteUser/'+userID+token)
      .pipe(map(response => response));
  }
}