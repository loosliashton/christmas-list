import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private firebase: FirebaseService
  ) {
    this.listId = data.listId;
  }

  async addItem(name: string, url: string) {
    let item: Item = {
      name: name,
      url: url,
      purchased: false
    };
    await this.firebase.addToList(item, this.listId);
  }
}
