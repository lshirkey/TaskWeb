import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userform = new User();
  userList = [];
  useraction = 'Add User';
  sortColumn = 'userId';
  optionSortDropDown = [
    {value : 'userId', display : 'Sort By - '},
    {value : 'firstName', display : 'Sort By - First Name'},
    {value : 'lastName', display : 'Sort By - Last Name'},
    {value : 'employeeId', display : 'Sort By - Employee Id'}];

  constructor(private userService: UserService) { }

  ngOnInit() {
    $(document).ready(() => {
      $('.deleteuserview').click(() => {
        $('#firstName').prop('disabled', true);
        $('#lastName').prop('disabled', true);
        $('#employeeId').prop('disabled', true);
      });
    });
    // deleteuserreq
    this.userService.searchUserList().subscribe((temp: any[]) => {
      this.userList = temp;
    });
  }

  createUser() {
    this.userform.status = 'A';
    this.userService.createUser(this.userform).subscribe(_ => {
      this.onReset();
      this.reload();
    });
  }

  updateUser() {
    this.userService.updateUser(this.userform).subscribe(_ => {
      this.onReset();
      this.reload();
      this.cancelEdit();
    });
  }

  deleteUser() {
    this.userform.status = 'D';
    this.userService.deleteUser(this.userform).subscribe(_ => {
      this.onReset();
      this.reload();
      this.cancelDelete();
    });
  }

  reload() {
    this.userService.searchUserList().subscribe((temp: any[]) => {
      this.userList = temp;
      this.sortColumn = 'userId';
    });
  }

  onReset() {
    this.userform = new User();
  }

  onEditUser(user) {
    this.useraction = 'Update User';
    this.userform = user;
  }
  cancelEdit() {
    this.useraction = 'Add User';
    this.onReset();
  }

  onDeleteUser(user) {
    this.useraction = 'Delete User';
    this.userform = user;
  }
  cancelDelete() {
    $('#firstName').prop('disabled', false);
    $('#lastName').prop('disabled', false);
    $('#employeeId').prop('disabled', false);
    this.useraction = 'Add User';
    this.onReset();
  }

  sortUserViewTable() {
    if (this.sortColumn === 'userId') {
      this.userList = this.userList.sort((one, two) => (one.userId > two.userId ? 1 : -1));
    } else if (this.sortColumn === 'firstName') {
      this.userList = this.userList.sort((one, two) => (one.firstName > two.firstName ? 1 : -1));
    } else if (this.sortColumn === 'lastName') {
      this.userList = this.userList.sort((one, two) => (one.lastName > two.lastName ? 1 : -1));
    } else if (this.sortColumn === 'employeeId') {
      this.userList = this.userList.sort((one, two) => (one.employeeId > two.employeeId ? 1 : -1));
    }
  }
}
