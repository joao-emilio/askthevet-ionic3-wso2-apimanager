import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestOptions, Http, Headers} from "@angular/http";
import {Ask} from "../../models/Ask";
import { ToastController } from "ionic-angular";

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

  constructor(public navCtrl: NavController, navParams: NavParams, public http: Http,
              public toastCtrl: ToastController ) {
    this.item = navParams.get('item');
    console.log( this.item.firstName );
    let api_url = "https://gateway.api.cloud.wso2.com:443/t/wso2apiforum/vets/v1.0.0/askthevet/" + this.item.id;

    let self = this;

    let headers = new Headers();
    headers.append('Authorization', 'Bearer 2727584b-979f-3a4e-8b50-145e7f6c6ed2');
    let options = new RequestOptions( { headers: headers });
    this.http.get( api_url, options ).subscribe( data => {
      console.log( "get perguntas retornou: " + data );
      self.perguntas = data.json() as Ask[];
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }

  done() {
    //this.ask.question = "teste";
    this.ask.vetId = this.item.id;
    let api_url = "https://gateway.api.cloud.wso2.com:443/t/wso2apiforum/vets/v1.0.0/askthevet";

    let self = this;

    let headers = new Headers();
    headers.append('Authorization', 'Bearer 2727584b-979f-3a4e-8b50-145e7f6c6ed2');
    let options = new RequestOptions( { headers: headers });
    this.http.post( api_url, this.ask, options ).subscribe( data => {
      console.log( "post retornou: " + data );
      let toast = this.toastCtrl.create( { message: 'Sua pergunta foi enviada.', duration: 3000 });
      toast.present();
      self.ask = new Ask();
      self.ask.question = "";
    });


  }

}
