import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'userpipe'
})
export class UserpipePipe implements PipeTransform {

  transform(items: User[], searchFirstName: string, searchLastName: string , searchEmployeeId: string): User[] {
    if (!items) {
      return null;
    }

    if (!searchFirstName && !searchLastName && !searchEmployeeId) {
      return items;
    }

    if (searchFirstName) {
      searchFirstName = searchFirstName.toLowerCase();
      items = items.filter( it => {
          return it.firstName.toLowerCase().includes(searchFirstName);
          });
    }

    if (searchLastName) {
      searchLastName = searchLastName.toLowerCase();
      items = items.filter( it => {
          return it.lastName.toLowerCase().includes(searchLastName);
          });
    }

    if (searchEmployeeId) {
      searchEmployeeId = searchEmployeeId.toLowerCase();
      items = items.filter( it => {
          return it.employeeId.toLowerCase().includes(searchEmployeeId);
          });
    }
  
    return items;
  }

}