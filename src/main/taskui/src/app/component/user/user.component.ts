import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userform = new User();
  userList = [];
  useraction = 'Add User';
  usersearch = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
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
    });
  }

  deleteUser() {
    this.userform.status = 'D';
    this.userService.deleteUser(this.userform).subscribe(_ => {
      this.onReset();
      this.reload();
    });
  }

  reload() {
    this.userService.searchUserList().subscribe((temp: any[]) => {
      this.userList = temp;
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
    this.useraction = 'Add User';
    this.onReset();
  }

  doFilter() {
    alert('Test');
  }
}
