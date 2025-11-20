import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-spoiler-prompt',
    templateUrl: './spoiler-prompt.component.html',
    styleUrl: './spoiler-prompt.component.css',
    standalone: false
})
export class SpoilerPromptComponent {
  rememberChoice: boolean = false;
  listId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { listId: string },
    public dialogRef: MatDialogRef<SpoilerPromptComponent>,
  ) {
    this.listId = data.listId;
  }

  onSelect(spoilers: boolean) {
    if (this.rememberChoice) {
      let spoilerChoices = localStorage.getItem('spoilerChoices');
      let spoilerChoicesMap = spoilerChoices
        ? JSON.parse(spoilerChoices)
        : {};
      spoilerChoicesMap[this.listId] = spoilers;
      localStorage.setItem(
        'spoilerChoices',
        JSON.stringify(spoilerChoicesMap),
      );
    }
    this.dialogRef.close(spoilers);
  }
}
