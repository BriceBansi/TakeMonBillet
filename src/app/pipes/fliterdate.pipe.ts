import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fliterdate'
})
export class FliterdatePipe implements PipeTransform {

  transform(items: any[], criteria: string): any {
    const jourActuel = moment();
    if (items === undefined) {
      return;
    }
    if (criteria === 'today') {
      return items.filter(item => {
        const jourTri = moment(item.registered, 'MM-DD-YYYY');
        const heureTri = moment(item.heureDepart, 'HH:mm');
        if (jourActuel.format('l') === jourTri.format('l')) {
          return jourActuel.isSameOrBefore(heureTri);
        }
      });
    } else if (criteria === 'tomorow') {
      return items.filter(item => {
        const jourTri = moment(item.registered, 'MM-DD-YYYY');
        return jourTri.isAfter(jourActuel);
      });
    } else {
      return items;
    }
  }
}


