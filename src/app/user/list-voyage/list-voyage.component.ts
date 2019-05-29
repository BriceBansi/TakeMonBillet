import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VoyageService } from '../../services/voyage.service';
import { Voyage } from '../../interfaces/models';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-list-voyage',
  templateUrl: './list-voyage.component.html',
  styleUrls: ['./list-voyage.component.css']
})
export class ListVoyageComponent implements OnInit {

  @Input() voyages: Voyage[];
  @Output() selectedVoyage = new EventEmitter<Voyage>();
  userFilter: any = { depart: '' };
  choixFiltre = 'today';
  myDate = '';
  constructor() {

  }
  ngOnInit() {
  }

  selectVoyage(v) {
    this.selectedVoyage.emit(v);
    console.log('list voyage component' + v);
  }





}
