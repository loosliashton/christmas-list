import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  item: Item;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.item = data.item;
  }
}
