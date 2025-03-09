import { HttpInterceptorFn } from '@angular/common/http';
import { UserServiceService } from '../services/user-service.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const userServise=inject(UserServiceService);
const token=userServise.token;

if (token) {
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(clonedRequest);
}
  
 return next(req);
};
