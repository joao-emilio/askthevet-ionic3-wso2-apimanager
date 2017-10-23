import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {Vet} from "../../models/Vet";

import { Http, Headers, RequestOptions } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Vet[];

  constructor(public navCtrl: NavController, public http: Http, public items: Items, public modalCtrl: ModalController) {

    let api_url = "https://gateway.api.cloud.wso2.com:443/t/wso2apiforum/vets/v1.0.0/vets";

    let headers = new Headers();
    headers.append('Authorization', 'Bearer 2727584b-979f-3a4e-8b50-145e7f6c6ed2');
    let options = new RequestOptions( { headers: headers });
    this.http.get( api_url, options ).subscribe( lista => {
      this.currentItems = lista.json() as Vet[];
    })

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('AskQuestionPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('AskQuestionPage', {
      item: item
    });
  }
}
