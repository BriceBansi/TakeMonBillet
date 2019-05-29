import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercat'
})
export class FiltercatPipe implements PipeTransform {

  transform(items: any[], criteria: string): any {
    if (criteria === 'all') {
      return items;
    } else {
      items.filter(item => {
        return item.categories === criteria;
      });
    }
  }

}
