import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { App1Reducer } from 'C:/Users/user/Angular-monorepo/apps/shellapp/src/app/store/app1.reducers';
import { App1Effects } from 'C:/Users/user/Angular-monorepo/apps/shellapp/src/app/store/app1.effects';
import { FormlyModule } from '@ngx-formly/core';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    })),
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
