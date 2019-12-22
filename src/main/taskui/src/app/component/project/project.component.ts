import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { formatDate } from '@angular/common';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { User } from '../../model/user';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm = new Project();
  userList = [];
  projectList = [];
  projectaction = 'Add Project';
  manager = new User();

  format = 'yyyy-MM-dd';
  todayDate = new Date();
  nextDate = new Date(this.todayDate.getTime() + (1000 * 60 * 60 * 24));
  locale = 'en-US';
  defaultStartDate = formatDate(this.todayDate, this.format, this.locale);
  defaultEndDate = formatDate(this.nextDate, this.format, this.locale);

  constructor(private userService: UserService, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.searchProjectList().subscribe((temp: any[]) => {
      this.projectList = temp;
    });
    this.userService.searchUserList().subscribe((temp: any[]) => {
      this.userList = temp;
    });

    $(document).ready(() => {
      this.projectForm.priority = 0;
      $('#startEndDate').click(() => {
        if ($('#startEndDate'). prop('checked') === true) {
          $('#startDate').prop('disabled', false);
          $('#endDate').prop('disabled', false);
          this.projectForm.startDate = this.defaultStartDate;
          $('#startDate').prop('value', this.defaultStartDate);
          this.projectForm.endDate = this.defaultEndDate;
          $('#endDate').prop('value', this.defaultEndDate);
        } else {
          $('#startDate').prop('disabled', true);
          $('#endDate').prop('disabled', true);
          this.projectForm.startDate = '';
          $('#startDate').prop('value', '');
          this.projectForm.endDate = '';
          $('#endDate').prop('value', '');
        }
      });
      this.onReset();
    });

    // Model manager search filter
    $('#managerSearch').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#managerNameList li').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  getManager(user) {
    this.projectForm.userId = user.userId;
    this.projectForm.userName = user.firstName;
  }
  createProject() {
    this.projectForm.status = 'Active';
    this.projectService.createProject(this.projectForm).subscribe(_ => {
      this.onReset();
      this.reload();
    });
  }
  updateProject() {
    this.projectService.updateProject(this.projectForm).subscribe(_ => {
      this.onReset();
      this.reload();
    });
  }
  suspendProject() {
    this.projectForm.status = 'Suspend';
    this.projectService.updateProject(this.projectForm).subscribe(_ => {
      this.onReset();
      this.reload();
    });
  }
  reload() {
    this.projectService.searchProjectList().subscribe((temp: any[]) => {
      this.projectList = temp;
    });
  }
  onReset() {
    this.projectForm = new Project();
  }
  onEditProject(project) {
    this.projectaction = 'Update Project';
    this.projectForm = project;
  }
  onSuspendProject(project) {
    this.projectaction = 'Suspend Project';
    this.projectForm = project;
  }
  cancelProject() {
    this.projectaction = 'Add Project';
    this.onReset();
  }
}