import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CanActivateFn, Route, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: 'shellapp2',
    loadChildren: () => import('shellapp2/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authenticationGuard()]
  },
  {
    path: 'shellapp',
    loadChildren: () => import('shellapp/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authenticationGuard()]
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard()]
  },
  {
    path: '**',
    component: LoginComponent
  },
];


export function authenticationGuard(): CanActivateFn {
  return () => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    
    if (loginService.hasAccess() ) {
      return true;
    }
    // loginService.login();
    router.navigate(['']);
    return false;
  };
}