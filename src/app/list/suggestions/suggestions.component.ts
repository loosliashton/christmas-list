import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/models/list';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
  list: List;
  results: any[] = [];
  loading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService
  ) {
    this.list = data.list;
  }

  async ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {
    this.firebase.getSuggestions(this.list).then((res) => {
      this.processResults(res);
    });
  }

  processResults(res: any) {
    let suggestions: any[] | undefined = res?.suggestions;
    if (!suggestions?.length) {
      this.results.push({
        name: 'No suggestions found',
        description: 'Try adding more items to your list',
      });
      this.loading = false;
      return;
    }

    for (let suggestion of suggestions) {
      if (!suggestion.name || !suggestion.description) continue;
      this.results.push(suggestion);
    }

    this.loading = false;
  }
}
