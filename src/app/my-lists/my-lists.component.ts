import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddListComponent } from './add-list/add-list.component';
import { List } from '../models/list';
import { User } from '../models/user';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css'],
})
export class MyListsComponent implements OnInit {
  email: string = '';
  lists: List[] = [];
  user: User | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
    this.user = await this.createUserIfNeeded(this.email);
    if (!this.user) return;

    if (this.user.lists) {
      this.lists = await this.firebase.getLists(this.user);
    }
  }

  async createUserIfNeeded(email: string): Promise<User | null> {
    let userId = await this.firebase.getUserIdByEmail(email);
    if (!userId) {
      userId = await this.firebase.addUser(email);
    }
    return await this.firebase.getUserById(userId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      data: {
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.ngOnInit();
    });
  }

  deleteList(listId: string): void {
    //this.firebase.deleteList(this.email, listId);
  }
}
