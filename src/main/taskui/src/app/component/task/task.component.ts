import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { formatDate } from '@angular/common';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { User } from '../../model/user';
import { ProjectService } from '../../service/project.service';
import { Task } from '../../model/task';
import { ParenttaskService } from '../../service/parenttask.service';
import { Parent } from '../../model/parent';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute } from '@angular/router';
import { isNull } from 'util';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm = new Task();
  parent = new Parent();
  userList = [];
  projectList = [];
  parentList = [];
  taskaction = 'Add Task';
  manager = new User();
  editTaskId = null;
  format = 'yyyy-MM-dd';
  todayDate = new Date();
  nextDate = new Date(this.todayDate.getTime() + (1000 * 60 * 60 * 24));
  locale = 'en-US';
  defaultStartDate = formatDate(this.todayDate, this.format, this.locale);
  defaultEndDate = formatDate(this.nextDate, this.format, this.locale);

  constructor(private userService: UserService, private projectService: ProjectService,
              private parenttaskService: ParenttaskService, private taskService: TaskService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.getTask(params.get('taskId'));
    });

    this.projectService.searchProjectList().subscribe((temp: any[]) => {
      this.projectList = temp;
    });
    this.userService.searchUserList().subscribe((temp: any[]) => {
      this.userList = temp;
    });
    this.parenttaskService.searchParentList().subscribe((temp: any[]) => {
      this.parentList = temp;
    });

    $(document).ready(() => {
      this.taskForm.priority = 0;
      this.taskForm.startDate = this.defaultStartDate;
      $('#startDate').prop('value', this.defaultStartDate);
      this.taskForm.endDate = this.defaultEndDate;
      $('#endDate').prop('value', this.defaultEndDate);

      $('#isparenttask').click(() => {
        if ($('#isparenttask'). prop('checked') === true) {
          this.taskaction = 'Add Parent';
          $('#project').prop('disabled', true);
          $('#priority').prop('disabled', true);
          $('#parentTask').prop('disabled', true);
          $('#startDate').prop('disabled', true);
          $('#endDate').prop('disabled', true);
          $('#userName').prop('disabled', true);
        } else {
          this.taskaction = 'Add Task';
          $('#project').prop('disabled', false);
          $('#priority').prop('disabled', false);
          $('#parentTask').prop('disabled', false);
          $('#startDate').prop('disabled', false);
          $('#endDate').prop('disabled', false);
          $('#userName').prop('disabled', false);
        }
      });
      this.onReset();
    });

    // Model user search filter
    $('#parentSearch').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#parentNameList li').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });

    // Model user search filter
    $('#userSearch').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#userNameList li').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });

    // Model project search filter
    $('#projectSearch').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#projectNameList li').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });

    if (!isNull(this.editTaskId)) {
      $('#isparenttask').prop('disabled', true);
      $('#projectDiv *').prop('disabled', true);
      $('#parentDiv *').prop('disabled', true);
    }
  }
  createTask() {
    this.taskForm.status = 'A';
    this.taskService.createParent(this.taskForm).subscribe(_ => {
      this.onReset();
    });
  }
  createParent() {
    this.parent.parentTask = this.taskForm.task;
    this.parenttaskService.createParent(this.parent).subscribe(_ => {
      this.onReset();
    });
  }
  getUser(user) {
    this.taskForm.userId = user.userId;
    this.taskForm.firstName = user.firstName;
  }
  getProject(project) {
    this.taskForm.projectId = project.projectId;
    this.taskForm.project = project.project;
  }
  getParent(parent) {
    this.taskForm.parentId = parent.parentId;
    this.taskForm.parentTask = parent.parentTask;
  }
  onReset() {
    this.taskForm = new Task();
  }
  onResetParent() {
    this.taskForm.task = null;
  }
  onClearParent() {
    this.taskForm.parentId = null;
    this.taskForm.parentTask = null;
  }
  getTask(taskId) {
    this.editTaskId = taskId;
    if (!isNull(this.editTaskId)) {
      this.taskaction = 'Update Task';
      this.taskService.getTask(taskId).subscribe((temp: Task) => {
      this.taskForm = temp;
     });
    }
  }

  updateParent() {
    this.taskForm.status = 'A';
    this.taskService.updateParent(this.taskForm).subscribe(_ => {
      this.onReset();
    });
  }
}
