import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/firebase.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  listId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private firebase: FirebaseService,
    public dialogRef: MatDialogRef<AddItemComponent>
  ) {
    this.listId = data.listId;
  }

  async addItem(name: string, url: string, details: string) {
    // Validate fields
    if (!name || !url) {
      this.snackbar.open('Please enter a name and URL', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Check if URL is valid
    if (!url.startsWith('http')) {
      this.snackbar.open('Please enter a valid URL', 'Close', {
        duration: 3000,
      });
      return;
    }
    
    let item: Item = {
      name: name,
      url: url,
      purchased: false,
      details: details,
    };
    await this.firebase.addToList(item, this.listId);
    this.dialogRef.close();
  }
}
