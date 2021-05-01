import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategoryFilter'
})
export class SubcategoryFilterPipe implements PipeTransform {

  transform(array: any[], filter:any[]): any[]{
    if (array && array.length && filter  && filter.length) {
      //console.table(  array.filter(product => filter.includes(product.subcategory_id)));
      return array.filter(product => filter.includes(product.subcategory_id));
    }
    return array;
  }

}
