import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddListComponent } from './add-list/add-list.component';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css'],
})
export class MyListsComponent implements OnInit {
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
    this.createUserIfNeeded(this.email);
  }

  async createUserIfNeeded(email: string) {
    let userExists = await this.firebase.userExists(this.email);
    if (!userExists) {
      this.firebase.addUser(this.email);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent);
  }
}
