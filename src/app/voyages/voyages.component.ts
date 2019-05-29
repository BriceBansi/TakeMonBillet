import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Voyage, Passager } from '../interfaces/models';
import { AuthService } from '../core/auth.service';
import { VoyageService } from '../services/voyage.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl,
   FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { PdfService } from '../services/pdf.service';
import { ErrorStateMatcher } from '@angular/material';

 // Error when invalid control is dirty, touched, or submitted.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.css']
})
export class VoyagesComponent implements OnInit {
  errorEqual = false;

  macther = new MyErrorStateMatcher();

  selectedVoyage: Voyage;
  voyageLists: Voyage[];
  clientVoyage: Passager;

  clientOneFormGroup: FormGroup;
  clientTwoFormGroup: FormGroup;
  isOption = false;
  showReservation = false;

  places = [];
  placesReservees: Number[];

  constructor(private vService: VoyageService,
    private _fb: FormBuilder,
    private pdf: PdfService) {
  }

  ngOnInit() {
    this.getVoyages();
    this.createFormsClient();
  }

  createFormsClient() {
    this.clientOneFormGroup = this._fb.group({
      name: ['', Validators.required],
      prenom: ['', Validators.required]
    });
    this.clientTwoFormGroup = this._fb.group({
      qte: [1, Validators.required],
      place: ['', Validators.required],
      codeMoney: ['', Validators.required],
    },
      {
        validator: this.validatePlace
      });
  }

  select(v: Voyage) {
    this.selectedVoyage = v;
    this.showReservation = true;
    this.placeDisponibles(v);

  }

  getVoyages() {
    this.vService.getListVoyage().snapshotChanges().subscribe(
      items => {
        this.voyageLists = [];
        items.forEach(item => {
          const y = item.payload.toJSON() as Voyage;
          y['$key'] = item.key;
          this.voyageLists.push(y);
        }
        );
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    console.log('this.clientOneFormGroup.value ' + this.clientOneFormGroup.value);
    console.log('this.clientTwoFormGroup.value ' + this.clientTwoFormGroup.value);
    const c = this.prepareSaveClient(this.clientOneFormGroup, this.clientTwoFormGroup);
    console.log('c ' + c);
    /* vérifier que les places sont encore disponibles */
    this.vService.saveClient(this.selectedVoyage, c);
  }

  printBillet() {
    this.pdf.createPDF(this.selectedVoyage, this.clientVoyage);
  }

  prepareSaveClient(form1: FormGroup, form2: FormGroup): Passager {
    const paid = form2.get('qte').value * this.selectedVoyage.price;
    return {
      name: form1.value.name,
      prenom: form1.value.prenom,
      paid,
      codeMoney: form2.value.codeMoney,
      place: form2.value.place,
      qte: form2.value.qte
    };
  }

  /**
   * Utilitaire permettant de vérifier les places disponibles
   *
   * @param {Number[]} placesDispo
   * @param {Number[]} placesReserve
   * @returns {Number[]}
   * @memberof VoyagesComponent
   */
  checkPlacesDispo(placesDispo: Number[], placesReserve: Number[]): Number[] {
    return placesDispo.filter(item => placesReserve.every(item2 => item2 !== item));
  }

  placeDisponibles(v) {
    if (v.takePlaces === '' || v.takePlaces === undefined) {
      for (let i = 1; i < v.nbrePlaces; i++) {
        this.places.push(i);
      }
    } else {
      this.placesReservees = v.takePlaces.split(',').map(Number);
      for (let i = 1; i < v.nbrePlaces; i++) {
        if (!this.placesReservees.includes(i)) {
          this.places.push(i);
        }
      }
    }
  }

  goToListVoyage() {
    this.showReservation = false;
  }

  validatePlace(fb: FormGroup): ValidationErrors | null {
    const place = fb.get('place');
    const qte = fb.get('qte');

    if (place && qte) {
      const places = Array.from(place.value);
      console.log('place.value ' + place);
      console.log('places ' + places);
      console.log('qte.value ' + qte.value);
      if (places.length !== qte.value) {
        return { 'equalPlace': true };
      }
      return null;
    }
  }

  afficherError() {
    this.errorEqual = this.clientTwoFormGroup.getError('equalPlace');
    console.log(this.clientTwoFormGroup.getError('equalPlace'));
  }
}
