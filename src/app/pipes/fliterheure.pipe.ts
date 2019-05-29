import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fliterheure'
})
export class FliterheurePipe implements PipeTransform {

  transform(items: any[], criteria: string): any {
      const heureActuelle = moment();
      if (heureActuelle === undefined || null) {
        return items;
      } else {
        return items.filter(item => {
          const jourTri = moment(item.registered, 'MM-DD-YYYY');
           if (jourTri.isAfter(heureActuelle)) {
            return items;
          }
        });
      }
  }

}
