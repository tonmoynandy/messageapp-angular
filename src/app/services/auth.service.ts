import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as Config from '../config';
@Injectable()

export class AuthService {
  httpOptions : object;
  constructor(private http:HttpClient) {
  	this.httpOptions = {
	  headers: new HttpHeaders({
	  	'Access-Control-Allow-Origin' : "*",
	  	"Access-Control-Allow-Credentials": "true",
	  	"Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT",
	  	"Access-Control-Allow-Headers": "access-control-allow-origin,content-type",
	    'Content-Type':  'application/json'
	  })
	}
  }

  postRegistration(postData:any) {
  	return this.http.post(Config.API_URL+'/auth/signup', JSON.stringify(postData), this.httpOptions)
  }

  postLogin(postData : any) {
  	return this.http.post(Config.API_URL+'/auth/signin', JSON.stringify(postData), this.httpOptions);
  }
}
