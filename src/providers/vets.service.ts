import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Ask} from "../models/Ask";

export class VetsService {

  public _api_url = "https://gateway.api.cloud.wso2.com:443/t/wso2apiforum/vets/v1.0.0";
  public _options: RequestOptions;
  public bearer = '6847da56-b602-30aa-ba27-0c8b46765a9f';

  constructor(public http: Http) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.bearer );
    this._options = new RequestOptions( { headers: headers });

  }

  public findAllQuestionsByVetId( id: number ): Observable<any> {
    return this.http.get( this._api_url + "/askthevet/" + id, this._options );
  }

  public findAllVets(): Observable<any> {
    console.log( this._options );
    return this.http.get(this._api_url + "/vets", this._options);
  }

  public postQuestion( question: Ask ): Observable<any> {
    return this.http.post( this._api_url + '/askthevet', question, this._options );
  }


  /**
  public delete(_id: string): Observable<any> {
    let url = `${environment.api_gateway_url}${this._api}/${_id}`;
    console.log( url );
    return this.http.delete(`${environment.api_gateway_url}${this._api}/${_id}`);
  }
   **/

  /**
  public save(_domain: Object, id: string): Observable<any> {
    if ( id ) {
      console.log("PUT");
      return this.http.put(`${environment.api_gateway_url}${this._api}/`, _domain);
    } else {
      console.log("POST");
      return this.http.post(`${environment.api_gateway_url}${this._api}`, _domain);
    }
  }
   **/

  /**
  public getDomain(_id: string): Observable<Object> {
    return this.http.get(`${environment.api_gateway_url}${this._api}/${_id}`)
      .map(( res: Response ) => {
        console.log(res.json() );
        return res.json();
      });
  }
**/

}
