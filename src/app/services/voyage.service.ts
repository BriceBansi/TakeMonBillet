import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
import { Voyage, Passager } from '../interfaces/models';


@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  uuid = '';

  voyageList: AngularFireList<Voyage | null>;
  clientList: AngularFireList<Passager | null>;
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.uuid = this.authService.currentUserId;
    this.voyageList = this.db.list('voyages');
  }
/**
 * Retourner la liste des voyages.
 *
 * @returns {AngularFireList<Voyage>}
 * @memberof VoyageService
 */
getListVoyage(): AngularFireList<Voyage> {
    return this.voyageList;
  }
/**
 * Sauvegarder un voyage.
 *
 * @param {Voyage} voyage
 * @memberof VoyageService
 */
saveVoyage(voyage: Voyage) {
    voyage.takePlaces = '0';
    voyage.userId = this.authService.currentUserId;
    this.voyageList.push(voyage);
  }
/**
 * Mise à jour d'un voyage.
 *
 * @param {Voyage} voyage
 * @memberof VoyageService
 */
updateVoyage(voyage: Voyage) {
    const key = voyage.$key;
    delete voyage.$key;
    this.voyageList.update(key, voyage);
  }
/**
 * Supprimer un voyage.
 *
 * @param {string} $key
 * @memberof VoyageService
 */
deleteVoyage($key: string) {
    this.voyageList.remove($key);
  }
/**
 * Sauvegarde un client dans un voyage.
 *
 * @param {string} key
 * @param {Passager} client
 * @memberof VoyageService
 */
saveClient(voyage: Voyage, client: Passager) {
  let data = {} as Voyage;
    this.clientList = this.db.list(`voyages/${voyage.$key}/passagers`);
    this.clientList.push(client);
    data = voyage;
    if (voyage.takePlaces === '' || undefined) {
      data.takePlaces = client.place.join();
    } else {
      data.takePlaces += ',' + client.place.join();
    }
    this.updateVoyage(data);
  }
/**
 * Retourne la liste des clients à partir de l'id d'un voyage
 *
 * @param {string} key
 * @returns
 * @memberof VoyageService
 */
getListClient (key: string) {
    return this.db.list(`voyages/${key}/passagers`);
  }

  get voyage (): Voyage {
    return this.voyage;
  }


  set voyage (v: Voyage) {
    this.voyage = v;
  }




}
