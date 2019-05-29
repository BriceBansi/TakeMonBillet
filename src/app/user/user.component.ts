import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Voyage, User } from '../interfaces/models';
import { VoyageService } from '../services/voyage.service';
import { element } from 'protractor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  data = {
    email: '',
    code: '',
    uid: ''
  };

  selectedVoyageUser: Voyage;
  showReservationUser = false;

  showList = false;
  itemList: AngularFireList<any>;
  voyagesFetch2: Voyage[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private authService: AuthService,
    private uService: UserService,
    public db: AngularFireDatabase,
    private vService: VoyageService,
    private _formBuilder: FormBuilder
    ) {

    /*this.authService.user.subscribe(res => {
      this.user = res;
      this.itemList = db.list('users');
      this.itemList.snapshotChanges().subscribe(
        actions => {
              console.log('res.uid ' + res.uid);
              console.log('actions ' + actions);
              actions.forEach(action => {
               const y = action.payload.toJSON() as UserModel;
                console.log('action value json ' + y);
                if ( y.uuid === res.uid) {
                  console.log('action value ' + action.payload.toJSON());
                  this.data.uid = y.uuid;
                  this.data.email = y.email;
                  this.data.code = y.code;
                  console.log('data final ' + this.data);
                }
              });
        },
        (err) => console.log(err));
     },
      (err) => console.log(err)
    );*/
  }

  createFormsUser() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  selectVoyageUser(v: Voyage) {
    this.selectedVoyageUser = v;
    this.showReservationUser = true;
    console.log('parent voyages user ' + v);
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.getUser();
    this.getVoyagesUser();
    this.createFormsUser();
  }

  goToListUser() {
    this.showReservationUser = false;
  }

  getVoyagesUser() {
    this.vService.getListVoyage().snapshotChanges().subscribe(
      items => {
        this.voyagesFetch2 = [];
        items.forEach(item => {
          const y = item.payload.toJSON() as Voyage;
          y['$key'] = item.key;
          if (y.userId === this.authService.currentUserId) {
            this.voyagesFetch2.push(y);
          }
        }
        );
      }
    );
  }

  getUser() {
    this.uService.usersList.snapshotChanges().subscribe(
      users => {
        const listUser = [];
        users.forEach(item => {
          const y = item.payload.toJSON() as User;
          y['$key'] = item.key;
          console.log('uuid ' + this.authService.currentUserId);
          if (y.uuid === this.authService.currentUserId) {
            listUser.push(y);
          }
        });
        this.user = listUser[0];
        console.log('user ' + this.user);
      },
      error => console.log(error)
    );
  }


}


