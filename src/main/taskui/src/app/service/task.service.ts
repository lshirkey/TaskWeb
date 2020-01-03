import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private SERVER_URL = 'http://localhost:8080/taskapi';

  constructor(private httpClient: HttpClient) { }

  public createParent(task) {
    return this.httpClient.post(this.SERVER_URL + '/addTask', task,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public endTask(task) {
    return this.httpClient.post(this.SERVER_URL + '/updateTask', task,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
  public updateParent(task) {
    return this.httpClient.post(this.SERVER_URL + '/updateTask', task,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
  public searchTaskList() {
    return this.httpClient.post(this.SERVER_URL + '/listTask',
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getTask(task) {
    return this.httpClient.post(this.SERVER_URL + '/viewTask', task,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
