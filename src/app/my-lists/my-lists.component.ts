import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css'],
})
export class MyListsComponent implements OnInit {
  email: string | null = '';

  constructor(private route: ActivatedRoute, private firebase: FirebaseService) {}

  async ngOnInit(): Promise<void> {
    this.email = this.route.snapshot.queryParamMap.get('email');
    let users = await this.firebase.getUsers();
    console.log("users: ", users[0]);
  }
}
