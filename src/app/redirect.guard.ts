import { CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';

export const redirectGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');

  if (id) {
    window.location.href = `https://swishlist.cc/list/${id}`;
  } else {
    window.location.href = 'https://swishlist.cc';
  }
  return false; // Prevent component activation
};
