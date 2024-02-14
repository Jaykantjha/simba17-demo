import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/authInterceptor.service';
import { decryptResponseInterceptor } from './shared/decrypt-response.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import * as quoteReducer from "./store";
import * as quoteEffect from "./store";
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor, decryptResponseInterceptor])),
    provideAnimations(),
    provideStore(),
    provideState({name: 'post', reducer: quoteReducer.reducer}),
    provideState({name: 'books', reducer: quoteReducer.bookReducer}),
    provideEffects([quoteEffect.GameEffects]),
    importProvidersFrom(
      HttpClientModule
    )
  ]
}; 
