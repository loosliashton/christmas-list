import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { List } from 'src/models/list';
import { Item } from 'src/models/item';
import { FirebaseService } from 'src/services/firebase.service';
import { RecentListComponent } from 'src/app/list/recent-list/recent-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddItemComponent } from '../../add-item/add-item.component';

@Component({
  selector: 'app-copy-to-list',
  imports: [CommonModule, MatDialogModule, RecentListComponent],
  templateUrl: './copy-to-list.component.html',
  styleUrl: './copy-to-list.component.css',
})
export class CopyToListComponent implements OnInit {
  recentLists: List[] = [];
  recentListCreators: string[] = [];
  loading: boolean = false;
  copyLoading: boolean = false;
  item: Item;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CopyToListComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { item: Item; copyImmediately: boolean },
  ) {
    this.item = data.item;
  }

  async ngOnInit() {
    // Retrieve recent lists
    const recentListsObject = JSON.parse(
      localStorage.getItem('recentLists') || '{}',
    );
    if (!Object.keys(recentListsObject).length) return;
    this.loading = true;

    // Sort the recent lists by date
    let sorted = Object.keys(recentListsObject).sort((a, b) => {
      let dateA = new Date(recentListsObject[a]);
      let dateB = new Date(recentListsObject[b]);
      return dateB.getTime() - dateA.getTime();
    });

    this.recentLists = await this.firebase.getListsFromIds(sorted.slice(0, 5));
    for (let list of this.recentLists) {
      let creator = await this.firebase.getUserById(list.creatorID);
      if (creator) this.recentListCreators.push(creator.name);
      else this.recentListCreators.push('Unknown');
    }

    this.loading = false;
  }

  async selectList(list: List) {
    if (this.copyLoading) {
      return;
    }

    if (this.data.copyImmediately) {
      // Reset 'purchased' status for the new copy.
      const itemCopy: Item = { ...this.item, purchased: false };
      list.items?.push(itemCopy);
      await this.saveAndClose(list);
    } else {
      // Open the AddItemComponent to allow for edits before copying.
      const dialogRef = this.dialog.open(AddItemComponent, {
        data: { list, item: this.item, newItem: true },
        width: '90vw',
        maxWidth: '600px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // The AddItemComponent has modified the list object. Save it and navigate.
          this.saveAndClose(list, true);
        }
      });
    }
  }

  private async saveAndClose(list: List, navigate: boolean = false) {
    this.copyLoading = true;
    try {
      await this.firebase.saveList(list);
      this.snackbar.open('Item added', 'Close', { duration: 3000 });
      if (navigate) {
        // Navigate to the list view, prevent going back to the share target.
        this.router.navigate(['/list', list.id], { replaceUrl: true });
      }
      this.dialogRef.close(list.id);
    } catch (error) {
      console.error('Error adding item:', error);
      this.snackbar.open('Failed to add item. Please try again.', 'Close', {
        duration: 3000,
      });
    } finally {
      this.copyLoading = false;
    }
  }
}
