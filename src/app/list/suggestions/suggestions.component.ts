import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/app/models/list';
import OpenAI, { ClientOptions } from 'openai';
import Configuration from 'openai';
import { environment } from 'src/environments/environment';

const config: ClientOptions = {
  dangerouslyAllowBrowser: true,
  apiKey: environment.openAIKey,
  organization: 'org-sEF2fHGH9aqBtdDLRifXuEVk',
};

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
  list: List;
  openai = new OpenAI(config);
  results: any[] = [];
  loading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.list = data.list;
  }

  async ngOnInit() {
    await this.openai.chat.completions
      .create({
        messages: [
          {
            role: 'system',
            content:
              "I'm putting together a gift list and need suggestions on what to add. Give me at least two suggestions and up to ten in the form of a JSON array in an object called 'suggestions'. Please return the following JSON for each suggestion: {name: string, description: string}.",
          },
          {
            role: 'user',
            content: this.generateContentString(this.list),
          },
        ],
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' },
        temperature: 0.2,
      })
      .then((res) => {
        this.processResults(res);
      });
  }

  generateContentString(list: List): string {
    let content = 'Here is my current list of items. Please give me at least two suggestions (preferably more) to add to the list. \n';
    if (!list.items) return content;
    for (let item of list.items) {
      content += `Item: ${item.name}; `;
      content += `URL: ${item.url}\n`;
    }
    return content;
  }

  processResults(res: OpenAI.Chat.Completions.ChatCompletion) {
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
