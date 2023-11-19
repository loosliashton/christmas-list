import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyListsComponent } from './my-lists/my-lists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-lists', component: MyListsComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, MyListsComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
