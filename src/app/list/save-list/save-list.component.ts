import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/firebase.service';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrl: './save-list.component.css',
})
export class SaveListComponent {
  list: List;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SaveListComponent>,
    private snackbar: MatSnackBar,
    private firebase: FirebaseService
  ) {
    this.list = data.list;
  }

  async saveList(email: string) {
    if (!email) return;
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.snackbar.open('Invalid email address', 'Close', {
        duration: 3000,
      });
      return;
    }

    let user = await this.firebase.createUserIfNeeded(email);
    if (!user) return;

    await this.firebase.saveList(user, this.list);
    this.snackbar.open('List saved', 'Close', {
      duration: 3000,
    });
    this.dialogRef.close(true);
  }
}
