import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'manufacturerListFilter'
})
export class SearchManufacturerListPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal = val.manufacturerName.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
