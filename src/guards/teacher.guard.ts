import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserServiceService); // Inject the AuthService
    const router = inject(Router); // Inject the Router to navigate
  
    if (userService.currentUser.role!='teacher') { // Check if the user is authenticated
      //router.navigate(['/auth/login']); // Redirect to login if not authenticated
     alert("forbbiden, you are not a teacher");
      return false; // Prevent access to the route
    }
  
  return true;
};
