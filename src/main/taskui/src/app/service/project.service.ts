import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private SERVER_URL = 'http://localhost:8080/taskapi';

  constructor(private httpClient: HttpClient) { }

  public createProject(project) {
    return this.httpClient.post(this.SERVER_URL + '/addProject', project,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
  public updateProject(project) {
    return this.httpClient.post(this.SERVER_URL + '/updateProject', project,
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
  public searchProjectList() {
    return this.httpClient.post(this.SERVER_URL + '/listProject',
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
