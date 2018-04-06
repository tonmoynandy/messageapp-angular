import { Directive , ElementRef, Renderer} from '@angular/core';
import {AppComponent} from './app.component';
@Directive({
  selector: '[togglepanel]',
  host : {
  	'(click)' : 'onClick()'
  }
})
export class TogglePanelDirective {
  element ;
  app;
  constructor(el: ElementRef, render: Renderer, app: AppComponent) {
  	this.element = el;
  	this.app = app;
  }

  onClick(){
  	let actionType = this.element.nativeElement.getAttribute('togglepanel');
  	
  	this.app.showpanel = actionType;
  }
}
