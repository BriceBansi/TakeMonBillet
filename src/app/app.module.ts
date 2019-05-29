import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Authentification
import { AuthGuard } from './core/auth.guard';





import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatGridListModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatTabsModule,
  MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
  MatStepperModule, MatChipsModule, MatRadioModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './products/products.component';
import { DetailComponent } from './detail/detail.component';
import { FiltercatPipe } from './pipes/filtercat.pipe';

import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { CreateVoyageComponent } from './user/create-voyage/create-voyage.component';
import { ListVoyageComponent } from './user/list-voyage/list-voyage.component';
import { VoyagesComponent } from './voyages/voyages.component';
import { DetailVoyageComponent } from './user/detail-voyage/detail-voyage.component';
import { FliterdatePipe } from './pipes/fliterdate.pipe';
import { FliterheurePipe } from './pipes/fliterheure.pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { PlaceValidatorDirective } from './directives/place-validator.directive';

const routes: Routes = [
  { path: '', redirectTo: '/voyages', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/detail/:id', component: DetailComponent },
  {
    path: 'user',
    children: [{
      path: 'createVoyageUser', component: CreateVoyageComponent
    },
    {
      path: 'listVoyageUser', component: ListVoyageComponent
    },
    {
      path: '', component: UserComponent
    }]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/listVoyageUser', component: ListVoyageComponent },
  { path: 'user/createVoyageUser', component: CreateVoyageComponent },
  { path: 'voyages', component: VoyagesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    DetailComponent,
    FiltercatPipe,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    CreateVoyageComponent,
    ListVoyageComponent,
    VoyagesComponent,
    DetailVoyageComponent,
    FliterdatePipe,
    FliterheurePipe,
    PlaceValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FilterPipeModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
