import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/models/list';
import { Item } from 'src/models/item';
import { FirebaseService } from 'src/services/firebase.service';
import { RecentListComponent } from 'src/app/list/recent-list/recent-list.component';

@Component({
  selector: 'app-copy-to-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RecentListComponent],
  templateUrl: './copy-to-list.component.html',
  styleUrl: './copy-to-list.component.css'
})
export class CopyToListComponent implements OnInit {
  recentLists: List[] = [];
  recentListCreators: string[] = [];
  loading: boolean = false;
  item: Item;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item },
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

  navigateToList(list: List) {
    this.router.navigate(['/list', list.id]);
  }
}
