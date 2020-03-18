import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'unassignedSerialFilter'
})
export class SearchUnassignedPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal = val.serialNumber.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
