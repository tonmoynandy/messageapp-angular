import { Component, OnInit } from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css'],
  //providers:[RightComponent]
})
export class LeftComponent implements OnInit {

  constructor(private dashboard : DashboardComponent ) { }

  ngOnInit() {
  	//this.right.compose = false;
  }
  onCompose() {
  	this.dashboard.compose = true;
  	//alert(this.right.compose);
  }
}
