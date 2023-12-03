import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/firebase.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { List } from 'src/app/models/list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent {
  shareUrl: string = '';
  list: List;
  loading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
  ) {
    this.list = data.list;
  }

  ngOnInit() {
    this.getShareUrl().then((url) => {
      this.shareUrl = `aloos.li/${url}`;
      this.loading = false;
    });
  }

  async getShareUrl(): Promise<string> {
    if (this.list.shortUrl) return this.list.shortUrl;

    const shortUrl = '';
    const longUrl = window.location.href;

    return fetch(
      `https://us-central1-aloosli-88777.cloudfunctions.net/newShortUrl?&shortUrl=${shortUrl}&longUrl=${longUrl}`,
      {
        method: 'POST',
      }
    ).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        const shortUrl = data.shortUrl;
        await this.firebase.updateListShortUrl(this.list, shortUrl);
        return shortUrl;
      }
    });
  }

  copyToClipboard() {
    this.clipboard.copy(this.shareUrl);
    this.snackbar.open('Copied to clipboard!', 'Dismiss', {
      duration: 3000,
    });
  }
}
