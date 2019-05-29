
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: AngularFireList<any>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.usersList = db.list('users');
  }
  /**
   *Sauvegarder un utilisateur avec son code d'entreprise
   *
   * @param {*} email
   * @param {*} code
   * @param {*} uuid
   * @memberof UserService
   */
  saveUser(email, code, uuid) {
    this.usersList.push({
      email,
      code,
      uuid
    });
    this.router.navigate(['user']);
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    /* return new Promise((resolve, reject) => {
       const user = firebase.auth().currentUser;
       user.updateProfile({
         displayName: value.name,
         photoURL: user.photoURL
       }).then(res => {
         resolve(res);
       }, err => reject(err));
     });*/
  }
}
