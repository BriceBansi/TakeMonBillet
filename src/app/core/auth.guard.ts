import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        return !!user;
      }),
      tap(logIn => {
        if (!logIn) {
          console.log('acces denied !');
          this.router.navigate(['login']);
        }
      })
    );
  }

}
