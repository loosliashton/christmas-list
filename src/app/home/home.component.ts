import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  badEmail: boolean = false;
  email: string = '';
  christmasTheme: boolean = false;

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    if ([11, 12].includes(currentMonth)) {
      this.christmasTheme = true;
    }

    // Retrieve the last used email
    const lastEmail = localStorage.getItem('lastEmail');
    if (lastEmail) {
      this.email = lastEmail;
    }
  }

  constructor(private router: Router) {}

  goToMyLists(email: string) {
    this.badEmail = false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email = email.toLowerCase().trim();

    if (emailPattern.test(email)) {
      localStorage.setItem('lastEmail', email);
      this.router.navigate(['/my-lists'], { queryParams: { email } });
    } else {
      this.badEmail = true;
    }
  }
}
