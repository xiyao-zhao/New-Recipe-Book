import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      // make sure we always just take the latest user value and unsubscribe for this guard execution
      // so we don't have an ongoing listener(user subscription) which we don't really need, which might create wierd behavior
      take(1),
      map(
        (user) => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        }
        // might trigger race conditions with mutiple redirects kind interfere with each other.
        // We can instead return an URLTree
        // tap((isAuth) => {
        //   if (!isAuth) {
        //     this.router.navigate(['/auth']);
        //   }
        // })
      )
    );
  }
}
