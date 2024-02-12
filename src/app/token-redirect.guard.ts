import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tokenRedirectGuard: CanActivateFn = (route, state) => {
  const token = route.queryParams['token'];
  const router = inject(Router);
  let redirectUrl: string;

  switch (token) {
    case 'token1':
      redirectUrl = '/page1';
      break;
    case 'token2':
      redirectUrl = '/page2';
      break;
    default:
      redirectUrl = '/started';
  }

  if (redirectUrl) {
    // router.navigateByUrl(redirectUrl);
    return router.createUrlTree([redirectUrl]);
    // return false; // Return false to prevent the original route from activating
  }

  return true; // Allow activation of the original route
};


