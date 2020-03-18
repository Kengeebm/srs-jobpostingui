import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'userFilter'
})
export class SearchUserPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal =
        val.login.toLocaleLowerCase().includes(String(args).toLowerCase()) ||
        val.email.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
