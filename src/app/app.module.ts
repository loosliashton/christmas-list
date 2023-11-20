import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddListComponent } from './my-lists/add-list/add-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { AddItemComponent } from './list/add-item/add-item.component';
import { SpoilerPromptComponent } from './list/spoiler-prompt/spoiler-prompt.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-lists', component: MyListsComponent },
  { path: 'list/:id', component: ListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyListsComponent,
    AddListComponent,
    AddItemComponent,
    SpoilerPromptComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
