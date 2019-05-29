import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Voyage, Passager } from '../../interfaces/models';
import { VoyageService } from '../../services/voyage.service';
import * as moment from 'moment' ;

@Component({
  selector: 'app-create-voyage',
  templateUrl: './create-voyage.component.html',
  styleUrls: ['./create-voyage.component.css']
})
export class CreateVoyageComponent implements OnInit {

  voyageForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private vService: VoyageService
  ) {
    this.createVogayeForm();
  }

  ngOnInit() {
  }

  createVogayeForm() {
    this.voyageForm = this.fb.group({
      compagny: ['', Validators.required],
      numeroBus: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      about: ['', Validators.required],
      registered: ['', Validators.required],
      depart: ['', Validators.required],
      arrivee: ['', Validators.required],
      heureDepart: [null, Validators.required],
      heureArrivee: [null, Validators.required],
      nbrePlaces: [0, Validators.required],
      price: [0, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.voyageForm.value);
    const v = this.prepareSave(this.voyageForm);
    console.log('v ' + v);
    this.vService.saveVoyage(v);
  }

  prepareSave(form: FormGroup): Voyage {
    return {
      company: form.value.compagny,
      email: form.value.email,
      phone: form.value.phone,
      address: form.value.adresse,
      about: form.value.about,
      heureDepart: form.value.heureDepart,
      heureArrivee: form.value.heureArrivee,
      nbrePlaces: form.value.nbrePlaces,
      numeroBus: form.value.numeroBus,
      registered: moment(form.value.registered).format('l'),
      isActive: true,
      price: form.value.price,
      picture: 'assets/images/',
      passagers: [],
      depart: form.value.depart,
      arrivee: form.value.arrivee,
      userId: ''
    };
  }

}
