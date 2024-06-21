import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { catalogFeatureKey, catalogReducer } from './catalog/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as catalogEffects from './catalog/store/effects'
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(),  
    provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75,
  }),
  provideState(catalogFeatureKey, catalogReducer),
  provideHttpClient(),
  provideEffects(catalogEffects)
]
};
