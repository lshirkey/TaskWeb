import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortuserpipe'
})
export class SortuserpipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
