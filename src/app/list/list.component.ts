import { ChangeDetectorRef, Component } from '@angular/core';
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
import { Title } from '@angular/platform-browser';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { SaveListComponent } from './save-list/save-list.component';
import { ShareComponent } from './share/share.component';

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
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    public dialog: MatDialog,
    private titleService: Title,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // Check to see if the user wants spoilers
    this.spoilers = await this.openSpoilerPrompt();

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id') ?? '';
      if (!id) return;

      // Get the list from the database
      this.firebase
        .getList(id)
        .then(async (list) => {
          this.list = list as List;
          if (!list) return;

          // Get the creator of the list
          await this.firebase.getUserById(list.creatorID).then((creator) => {
            if (!creator) return;
            this.creator = creator;
            this.titleService.setTitle(`${this.creator?.name}'s List`);
            // Force the page name to update
            this.cdr.detectChanges();
          });
        })
        .finally(() => {
          this.loading = false;
        });
    });
  }

  openItemModal(item: Item) {
    const dialogRef = this.dialog.open(ItemComponent, {
      data: {
        item: item,
        listId: this.list!.id,
        spoilers: this.spoilers,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        listId: this.list!.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }

  openSaveModal() {
    const dialogRef = this.dialog.open(SaveListComponent, {
      data: {
        list: this.list,
      },
    });
  }

  refreshData() {
    this.firebase.getList(this.list!.id!).then((list) => {
      this.list = list as List;
    });
  }

  openSpoilerPrompt(): Promise<boolean> {
    const dialogRef = this.dialog.open(SpoilerPromptComponent);
    return dialogRef.afterClosed().toPromise();
  }

  deleteItem(itemId: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      if (this.list) {
        this.firebase.removeFromList(this.list.id!, itemId);
        this.refreshData();
      }
    }
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        listId: this.list!.id,
        item: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }

  openSuggestionModal() {
    const dialogRef = this.dialog.open(SuggestionsComponent, {
      data: {
        list: this.list,
      },
    });
  }

  openShareModal() {
    const dialogRef = this.dialog.open(ShareComponent, {
      data: {
        list: this.list,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }
}
