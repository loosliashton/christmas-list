import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  badEmail: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMyLists(email: string) {
    this.badEmail = false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailPattern.test(email)) {
      this.router.navigate(['/my-lists'], { queryParams: { email } });
    } else {
      this.badEmail = true;
    }
  }
}
