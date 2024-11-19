import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { FirebaseService } from 'src/app/firebase.service';
import * as amazonAsin from 'amazon-asin';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  item: Item;
  listId: string;
  spoilers: boolean;
  camelUrl: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService,
  ) {
    this.item = data.item;
    this.listId = data.listId;
    this.spoilers = data.spoilers;
  }

  async ngOnInit(): Promise<void> {
    this.camelUrl = await this.getCamelUrlIfAmazon();
  }

  togglePurchase() {
    this.firebase.purchaseItem(
      this.listId,
      this.item.id!,
      !this.item.purchased,
    );
  }

  isAmazonUrl(): boolean {
    const amazonUrlPattern =
      /^https?:\/\/(www\.)?amazon\.com\/dp\/[A-Z0-9]{10}\/?\?.*$/;
    return this.item.url ? amazonUrlPattern.test(this.item.url) : false;
  }

  getCamelUrl(): string {
    // Get the item ID from the Amazon URL
    var amazonAsin = require('amazon-asin');

    amazonAsin.asyncParseAsin("http://amzn.to/2eEPcFk");
    const itemId = this.item.url.split('/dp/')[1].split('/')[0];
    return `https://camelcamelcamel.com/product/${itemId}`;
  }

  async getCamelUrlIfAmazon(): Promise<string | null> {
    var amazonAsin = require('amazon-asin');
    let result = await amazonAsin.asyncParseAsin(this.item.url);
    return null;
  }
}

