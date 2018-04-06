import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authentication : boolean;
  user : string;
  constructor(private _cookieService:CookieService) {
  	this.authentication = false;
  }

  ngOnInit() {
  	this.user = this._cookieService.get("_u");
  	if (this.user != undefined) {
  		this.authentication = true;	
  	}
  	
  }

}
