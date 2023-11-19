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
    if (!this.user) {
      return;
    }
    if (this.user.lists) {
      this.lists = this.user.lists;
    }
    console.log(this.user);
  }

  async createUserIfNeeded(email: string): Promise<User | null> {
    let userExists = await this.firebase.userExists(this.email);
    if (!userExists) {
      await this.firebase.addUser(this.email);
    }
    return await this.firebase.getUser(this.email);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      data: {
        user: this.user,
      },
    });
  }

  deleteList(listId: string): void {
    //this.firebase.deleteList(this.email, listId);
  }
}
