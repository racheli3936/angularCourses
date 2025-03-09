import { CanActivateFn } from '@angular/router';

export const homeGuardsGuard: CanActivateFn = (route, state) => {
  return true;
};
