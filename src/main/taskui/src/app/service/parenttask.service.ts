import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParenttaskService {

  private SERVER_URL = 'http://localhost:8080/taskapi';

  constructor(private httpClient: HttpClient) { }

  public searchParentList() {
    return this.httpClient.post(this.SERVER_URL + '/listParentTask',
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public createParent(parent) {
    return this.httpClient.post(this.SERVER_URL + '/addParentTask', parent,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
