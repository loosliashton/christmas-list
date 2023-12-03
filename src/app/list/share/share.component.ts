import { Component } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent {
  shareUrl: string = '';

  constructor() {}

  ngOnInit() {
    this.getShareUrl().then((url) => {
      this.shareUrl = url;
    });
  }

  async getShareUrl(): Promise<string> {
    const shortUrl = '';
    const longUrl = 'https://www.example.com';

    return fetch(
      `https://us-central1-aloosli-88777.cloudfunctions.net/newShortUrl?&shortUrl=${shortUrl}&longUrl=${longUrl}`,
      {
        method: 'POST',
      }
    ).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log(data.shortUrl);
        return data.shortUrl;
      }
    });
  }
}
