import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/app/models/list';
import { FirebaseService } from 'src/app/firebase.service';

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
    if (!res.choices || !res.choices[0]) {
      this.results.push({
        name: 'No suggestions found',
        description: 'Try adding more items to your list',
      });
      this.loading = false;
      return;
    }
    let result = res.choices[0].message.content;
    if (!result) return;
    let suggestions = JSON.parse(result).suggestions;

    for (let suggestion of suggestions) {
      if (!suggestion.name || !suggestion.description) continue;
      this.results.push(suggestion);
    }

    console.log(this.results);
    this.loading = false;
  }
}
