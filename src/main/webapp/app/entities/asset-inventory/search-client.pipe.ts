import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'clientFilter'
})
export class SearchClientPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal = val.clientName.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
