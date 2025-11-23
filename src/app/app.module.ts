import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { redirectGuard } from './redirect.guard';

const routes: Routes = [
  { path: '', canActivate: [redirectGuard], component: AppComponent },
  { path: 'list/:id', canActivate: [redirectGuard], component: AppComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
