import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/services/firebase.service';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  listId: string;
  item: Item | undefined;
  name: string = '';
  url: string = '';
  details: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private firebase: FirebaseService,
    public dialogRef: MatDialogRef<AddItemComponent>
  ) {
    this.listId = data.listId;
    this.item = data.item;
  }

  ngOnInit(): void {
    if (this.item) {
      this.name = this.item.name;
      this.url = this.item.url;
      this.details = this.item.details;
    }
  }

  async addItem(name: string, url: string, details: string) {
    // Validate fields
    if (!name) {
      this.snackbar.open('Please enter a name', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Check if URL is valid
    if (url && !url.startsWith('http')) {
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

    if (this.item) {
      item = this.item;
      item.name = name;
      item.url = url;
      item.details = details;
      await this.firebase.editItem(item, this.listId);
    } else {
      await this.firebase.addToList(item, this.listId);
    }
    this.snackbar.open(`"${name}" added`, 'Close', {
      duration: 2000,
    });
    this.dialogRef.close();
  }
}
