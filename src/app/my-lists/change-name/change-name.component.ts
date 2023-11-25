import { Component, Inject } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.css',
})
export class ChangeNameComponent {
  id: string;
  nameInput: string;

  constructor(
    private firebase: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.nameInput = data.name;
  }

  changeName(newName: string) {
    this.firebase.changeName(this.id, newName);
  }
}
