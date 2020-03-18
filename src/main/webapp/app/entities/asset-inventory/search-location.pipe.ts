import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'locationFilter'
})
export class SearchLocationPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal = val.locationName.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
