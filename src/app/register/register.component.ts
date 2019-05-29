import { Component, OnInit, Injectable } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  email = '';
  password = '';
  itemList: AngularFireList<any>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public db: AngularFireDatabase,
    private fire: AngularFireAuth
  ) {
    this.createForm();
    this.itemList = db.list('users');
   }
   ngOnInit () {}
   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['', Validators.required],
       code: ['', Validators.required]
     });
   }

   tryFacebookLogin() {
     this.authService.doFacebookLogin()
     .then(res => {
       this.router.navigate(['/user']);
     }, err => console.log(err)
     );
   }

   tryTwitterLogin() {
     this.authService.doTwitterLogin()
     .then(res => {
       this.router.navigate(['/user']);
     }, err => console.log(err)
     );
   }

   tryGoogleLogin() {
     this.authService.doGoogleLogin()
     .then(res => {
       this.router.navigate(['/user']);
     }, err => console.log(err)
     );
   }

   tryRegister(value) {
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = '';
       this.successMessage = 'Your account has been created';
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     });
}

}
