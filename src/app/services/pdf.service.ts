import { Injectable, ElementRef } from '@angular/core';
import { Voyage, Passager } from '../interfaces/models';
import * as jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  createPDF(infoVoyages: Voyage, clientVoyage: Passager) {
    const doc = new jsPDF();
    doc.text(35, 25, 'BILLET DE TRANSPORT ' + infoVoyages.company);

    doc.setTextColor(0, 255, 0);
    doc.text(20, 70, 'Départ : ' + infoVoyages.depart);

    doc.setTextColor(255, 0, 0);
    doc.text(20, 80, 'Arrivée : ' + infoVoyages.arrivee);

    doc.setTextColor(0, 0, 255);
    doc.text(20, 90, 'Heure Départ : ' + infoVoyages.heureDepart);

    doc.save('BilletDeTransport.pdf');
  }

}
