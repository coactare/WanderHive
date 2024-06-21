import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));


/* OLD WAY

  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

  import {AppModule} from './app/app.module';

  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

*/

/* APP MODULE CONTENT, This will reside under app folder with name app.module.ts

import { NgModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations:[AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]

})

export class AppModule {}

*/


