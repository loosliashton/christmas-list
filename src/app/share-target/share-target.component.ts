import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-share-target',
  templateUrl: './share-target.component.html',
  styleUrls: ['./share-target.component.css'],
  standalone: false
})
export class ShareTargetComponent implements OnInit {
  receivedTitle: string | null = null;
  receivedText: string | null = null;
  receivedUrl: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.receivedTitle = params.get('title');
      this.receivedText = params.get('text');
      this.receivedUrl = params.get('url');
    });
  }
}
