import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'nameFilter'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal =
        val.assignTo.toLocaleLowerCase().includes(String(args).toLowerCase()) ||
        val.serialNumber.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
