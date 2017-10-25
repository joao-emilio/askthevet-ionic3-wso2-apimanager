import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Ask} from "../../models/Ask";
import { ToastController } from "ionic-angular";
import {VetsService} from "../../providers/vets.service";
import {Http} from "@angular/http";

/**
 * Generated class for the AskQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})
export class AskQuestionPage {
  item: any;
  ask = new Ask();
  perguntas: Ask[];
  public vetsService: VetsService;

  constructor(public navCtrl: NavController, navParams: NavParams,
              public toastCtrl: ToastController, public http: Http ) {
    this.vetsService = new VetsService( this.http );
    this.item = navParams.get('item');
    console.log( this.item.firstName );

    let self = this;

    this.vetsService.findAllQuestionsByVetId( this.item.id ).subscribe( data => {
      console.log( "get perguntas retornou: " + data.json() );
      self.perguntas = data.json() as Ask[];
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }

  done() {
    //this.ask.question = "teste";
    this.ask.vetId = this.item.id;
    let self = this;

    this.vetsService.postQuestion( this.ask ).subscribe( data => {
      console.log( "post retornou: " + data );
      let toast = this.toastCtrl.create( { message: 'Sua pergunta foi enviada.', duration: 3000 });
      toast.present();
      self.ask = new Ask();
      self.ask.question = "";
    });

  }

}
