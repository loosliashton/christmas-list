import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { List } from '../../models/list';
import { User } from '../../models/user';
import { Item } from '../../models/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { SpoilerPromptComponent } from './spoiler-prompt/spoiler-prompt.component';
import { Title } from '@angular/platform-browser';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { SaveListComponent } from './save-list/save-list.component';
import { ShareComponent } from './share/share.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  list: List | undefined;
  creator: User | undefined;
  spoilers: boolean = false;
  loading: boolean = true;
  saveListLoading: boolean = false;
  cancelEditListLoading: boolean = false;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    public dialog: MatDialog,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      let id = params.get('id') ?? '';
      if (!id) return;

      await this.getList(id);
      if (!this.list) return;

      // Get the creator of the list
      await this.firebase.getUserById(this.list.creatorID).then((creator) => {
        if (!creator) return;
        this.creator = creator;
        this.titleService.setTitle(`${this.creator?.name}'s List`);
        // Force the page name to update
        this.cdr.detectChanges();
      });

      // Save this list to local recent lists
      let recentLists = JSON.parse(localStorage.getItem('recentLists') || '{}');

      recentLists[id] = new Date();
      localStorage.setItem('recentLists', JSON.stringify(recentLists));

      // Check to see if the user wants spoilers
      this.spoilers = await this.openSpoilerPrompt();
      this.loading = false;
    });
  }

  async getList(id: string) {
    await this.firebase.getList(id).then(async (list) => {
      this.list = list as List;
    });
  }

  async editList() {
    if (!this.editing) {
      this.editing = true;
    } else {
      this.cancelEditListLoading = true;
      await this.getList(this.list!.id!);
      this.editing = false;
      this.cancelEditListLoading = false;
    }
  }

  async saveList() {
    if (this.list) {
      this.saveListLoading = true;
      if (!(await this.firebase.saveList(this.list))) {
        this.snackbar.open('Error saving list', 'Close', { duration: 3000 });
        this.getList(this.list.id!);
      } else {
        this.snackbar.open('List updated', 'Close', { duration: 3000 });
      }
      this.saveListLoading = false;
      this.editing = false;
    }
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
      if (result) this.saveList();
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        list: this.list,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.saveList();
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

  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      if (this.list) {
        this.list.items?.splice(index, 1);
        this.saveList();
      }
    }
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        list: this.list,
        item: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.saveList();
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

  moveItem(index: number, direction: string) {
    this.swapItems(index, index + (direction === 'up' ? -1 : 1));
  }

  swapItems(index1: number, index2: number) {
    if (this.list) {
      const temp = this.list.items![index1];
      this.list.items![index1] = this.list.items![index2];
      this.list.items![index2] = temp;
    }
  }
}
