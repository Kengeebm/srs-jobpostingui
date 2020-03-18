import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'assetListFilter'
})
export class SearchAssetListPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      const rVal = val.assetName.toLocaleLowerCase().includes(String(args).toLowerCase());
      return rVal;
    });
  }
}
