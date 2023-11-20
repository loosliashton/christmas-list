import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { List } from '../models/list';
import { User } from '../models/user';
import { Item } from '../models/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  id: string = '';
  list: List | undefined;
  creator: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
      if (!this.id) return;

      // Get the list from the database
      this.firebase.getList(this.id).then((list) => {
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
}
