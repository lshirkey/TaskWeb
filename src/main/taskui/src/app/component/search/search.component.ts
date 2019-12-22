import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import * as $ from 'jquery';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  projectForm = new Project();
  projectList = [];
  tasklist = [];
  taskEnd = new Task();

  constructor(private projectService: ProjectService, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
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
}
