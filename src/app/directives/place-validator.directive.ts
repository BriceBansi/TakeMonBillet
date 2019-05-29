import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, ValidationErrors, ValidatorFn, Validator, FormGroup, Validators } from '@angular/forms';

@Directive({
  selector: '[appPlaceValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PlaceValidatorDirective, multi: true }
  ]
})
export class PlaceValidatorDirective implements Validator {
  // @Input() fb: FormGroup;

  validate(fb: FormGroup): ValidationErrors | null {
    return this.validatePlace(fb);
  }

  validatePlace(fb: FormGroup): ValidationErrors | null {
    const place = fb.get('place');
    const qte = fb.get('qte');

    if (place && qte) {
      const places = Array.from(place.value);
      console.log('place.value ' + place);
      console.log('places ' + places);
      console.log('qte.value ' + qte);
      return places.length === qte.value ? { 'equalPlace': true } : null;
    }
  }
  constructor() { }

}


