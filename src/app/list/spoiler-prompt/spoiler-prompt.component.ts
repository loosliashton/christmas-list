import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spoiler-prompt',
  templateUrl: './spoiler-prompt.component.html',
  styleUrl: './spoiler-prompt.component.css',
})
export class SpoilerPromptComponent {
  constructor(public dialogRef: MatDialogRef<SpoilerPromptComponent>) {}

  onSelect(spoilers: boolean) {
    this.dialogRef.close(spoilers);
  }
}
