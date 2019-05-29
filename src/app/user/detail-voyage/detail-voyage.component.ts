import { Component, OnInit, Input } from '@angular/core';
import { Voyage } from '../../interfaces/models';
import { VoyageService } from '../../services/voyage.service';

@Component({
  selector: 'app-detail-voyage',
  templateUrl: './detail-voyage.component.html',
  styleUrls: ['./detail-voyage.component.css']
})
export class DetailVoyageComponent implements OnInit {

  @Input() voyageDetail: Voyage;
  placeRestante: Number;

  constructor(private voyageService: VoyageService) {

  }

  ngOnInit() {
    if (this.voyageDetail.takePlaces === undefined || this.voyageDetail.takePlaces === '') {
      this.placeRestante = this.voyageDetail.nbrePlaces;
    } else {
      this.placeRestante = this.voyageDetail.nbrePlaces - this.voyageDetail.takePlaces.split(',').length;
    }
  }
}
