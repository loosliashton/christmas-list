import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-change-list-name',
  templateUrl: './change-list-name.component.html',
  styleUrl: './change-list-name.component.css',
})
export class ChangeListNameComponent {
  id: string;
  nameInput: string;

  constructor(
    private firebase: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChangeListNameComponent>
  ) {
    this.id = data.list.id;
    this.nameInput = data.list.name;
  }

  async changeListName(newName: string) {
    await this.firebase.editListName(this.id, newName);
    this.dialogRef.close(true);
  }
}
