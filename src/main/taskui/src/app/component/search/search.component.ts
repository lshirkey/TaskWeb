import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import * as $ from 'jquery';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  projectForm = new Project();
  searchProject = new Project();
  projectList = [];
  tasklist = [];
  taskEnd = new Task();

  sortColumn = 'taskId';
  optionSortDropDown = [
    {value : 'taskId', display : 'Sort By - '},
    {value : 'startDate', display : 'Sort By - Start Date'},
    {value : 'endDate', display : 'Sort By - End Date'},
    {value : 'priority', display : 'Sort By - Priority'},
    {value : 'status', display : 'Sort By - Task Completed'}];

  constructor(private projectService: ProjectService, private taskService: TaskService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.searchProject.projectId = Number(params.get('projectId'));
      this.searchProject.project =  params.get('project');
      this.getProject(this.searchProject);
    });

    this.projectService.searchProjectList().subscribe((temp: any[]) => {
      this.projectList = temp;
    });

    // Model project search filter
    $('#projectSearch').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#projectNameList li').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  onEditTask(task) {
    this.router.navigate(['/task', task]);
  }

  onEndTask(task) {
    this.taskEnd = task;
    this.taskEnd.status = 'E';
    this.taskService.endTask(task).subscribe(_ => {
      this.taskEnd = new Task();
    });
  }

  getProject(project) {
    this.tasklist = [];
    this.projectForm.projectId = project.projectId;
    this.projectForm.project = project.project;
    this.taskService.searchTaskList().subscribe((temp: any[]) => {
      this.tasklist = temp;
    });
  }

  onClearProject() {
    this.projectForm.projectId = null;
    this.projectForm.project = null;
  }

  sortUserViewTable() {
    if (this.sortColumn === 'taskId') {
      this.tasklist = this.tasklist.sort((one, two) => (one.taskId > two.taskId ? 1 : -1));
    } else if (this.sortColumn === 'priority') {
      this.tasklist = this.tasklist.sort((one, two) => (one.priority > two.priority ? 1 : -1));
    } else if (this.sortColumn === 'status') {
      this.tasklist = this.tasklist.sort((one, two) => (one.status > two.status ? 1 : -1));
    } else if (this.sortColumn === 'startDate') {
      this.tasklist = this.tasklist.sort((one, two) => (one.startDate > two.startDate ? 1 : -1));
    } else if (this.sortColumn === 'endDate') {
      this.tasklist = this.tasklist.sort((one, two) => (one.endDate > two.endDate ? 1 : -1));
    }
  }
}
