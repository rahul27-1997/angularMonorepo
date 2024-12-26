import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { App1Effects } from './store/app1.effects';
import { App1Reducer } from './store/app1.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore(),
    provideState({
      name: 'app1',
      reducer: App1Reducer
    }),
    provideEffects(App1Effects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ],
};
