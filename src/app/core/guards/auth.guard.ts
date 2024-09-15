import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(AuthenticationService);
  const Route = inject(Router);
  if (AuthService.isLoggedIn()) {
    console.log("here");
    
    return true;
  } else {
    console.log("There");
    Route.navigate(['/login']);
    return false;
  }
};
