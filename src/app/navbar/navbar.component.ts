import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLog: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,
     private pProduct: ProductsService,
      private aService: AuthService,
      private router: Router) {
    this.isLog = this.aService.authenticated;
    console.log('log ' + this.isLog);
  }
  filterBy(value) {
    this.pProduct.setValue(value);
    console.log(value + this.pProduct.getValue());
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
  }
