import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/services/firebase.service';
import { Item } from 'src/models/item';
import { List } from 'src/models/list';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  list: List;
  item: Item | undefined;
  name: string = '';
  url: string = '';
  details: string = '';
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private firebase: FirebaseService,
    public dialogRef: MatDialogRef<AddItemComponent>,
  ) {
    this.list = data.list;
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

    let camelUrl = '';
    if (this.firebase.isAmazonUrl(url)) {
      this.loading = true;
      camelUrl = await this.firebase.getCamelLink(url);
      this.loading = false;
    }
    
    let item: Item = {
      name: name,
      url: url,
      purchased: false,
      details: details,
      camelUrl: camelUrl,
    };

    if (this.item) {
      // Update the item object with the new values
      item = this.item;
      item.name = name;
      item.url = url;
      item.details = details;
      item.camelUrl = camelUrl;
    } else {
      // Add the item to the list
      this.list.items?.push(item);
    }

    this.dialogRef.close(true);
  }
}
