import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public createUser(user) {
    return this.httpClient.post(this.SERVER_URL + '/addUser', user,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public updateUser(user) {
    return this.httpClient.post(this.SERVER_URL + '/updateUser', user,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public deleteUser(user) {
    return this.httpClient.post(this.SERVER_URL + '/deleteUser', user,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public searchUserList() {
    return this.httpClient.post(this.SERVER_URL + '/listUser',
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}