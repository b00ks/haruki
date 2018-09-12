import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { BookstoresApi } from '../../providers/providers';


@Component({
  selector: 'page-bookstores',
  templateUrl: 'bookstores.html'
})
export class BookstoresPage {
  
  currentItems: any = [];
  bookstores: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bookstoresApi: BookstoresApi,
              public loadingController: LoadingController,
              public items: Items) { }

  /**
   * Perform a service for the proper items.
   */
  searchBookstore(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      this.loadBookstores();
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
    this.bookstores = [];
  }

  loadBookstores() {
    let loader = this.loadingController.create({
      spinner: 'crescent',
      content: 'Getting Bookstores'
    });

    loader.present().then(() => {
      this.bookstoresApi.getBookstores().then(data => {
        this.bookstores = data;
        loader.dismiss();
      });  
    });
  }

  ionViewDidLoad() {    
    this.loadBookstores();
  }

  
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
