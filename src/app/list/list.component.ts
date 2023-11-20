import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { List } from '../models/list';
import { User } from '../models/user';
import { Item } from '../models/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { SpoilerPromptComponent } from './spoiler-prompt/spoiler-prompt.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  list: List | undefined;
  creator: User | undefined;
  spoilers: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    // Check to see if the user wants spoilers
    // this.spoilers = await this.openSpoilerPrompt();

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id') ?? '';
      if (!id) return;

      // Get the list from the database
      this.firebase.getList(id).then((list) => {
        this.list = list as List;
        if (!list) return;

        // Get the creator of the list
        this.firebase.getUserById(list.creatorID).then((creator) => {
          if (!creator) return;
          this.creator = creator;
        });
      });
    });
  }

  openItemModal(item: Item) {
    const dialogRef = this.dialog.open(ItemComponent, {
      data: {
        item: item,
      },
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        listId: this.list!.id,
      },
    });
  }

  openSpoilerPrompt(): Promise<boolean> {
    const dialogRef = this.dialog.open(SpoilerPromptComponent);
    return dialogRef.afterClosed().toPromise();
  }

  deleteItem(itemId: string) {
    // Confirm that the item should be deleted
    if (confirm('Are you sure you want to delete this item?')) {
      if (this.list) {
        this.firebase.removeFromList(this.list.id!, itemId);
      }
    }
  }
}
