import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css'],
})
export class MyListsComponent implements OnInit {
  email: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
  }
}
