import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserServiceService); // Inject the AuthService
  const router = inject(Router); // Inject the Router to navigate

  if (userService.currentUser.password=='') { // Check if the user is authenticated
    router.navigate(['/auth/login']); // Redirect to login if not authenticated
    return false; // Prevent access to the route
  }

  return true;
};
