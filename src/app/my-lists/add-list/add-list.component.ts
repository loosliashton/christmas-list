import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/firebase.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.css',
})
export class AddListComponent {
  user: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService
  ) {
    this.user = data.user;
  }

  addList(listName: string) {
    this.firebase.addList(this.user, listName);
  }
}
