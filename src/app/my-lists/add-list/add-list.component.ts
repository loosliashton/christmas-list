import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.css',
})
export class AddListComponent {
  user: User;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService,
    public dialogRef: MatDialogRef<AddListComponent>,
    private snackbar: MatSnackBar
  ) {
    this.user = data.user;
  }

  async addList(listName: string) {
    this.loading = true;
    await this.firebase.addList(this.user, listName);
    this.loading = false;
    this.snackbar.open(`"${listName}" added successfully`, 'Close', {
      duration: 2000,
    });
    this.dialogRef.close(true);
  }
}
