import { Directive, ElementRef,  Renderer2 } from '@angular/core';

@Directive({
  selector: '[focustext]',
  host : {
  	'(focus)' : 'onFocus()',
  	'(blur)' : 'onBlur()',
  }
})
export class TextfocusDirective {

	constructor(private el : ElementRef, private render2 : Renderer2) { }

	onFocus() {
		let element = this.el.nativeElement;

		
		const label = element.getAttribute('placeholder');
		this.render2.setStyle(element, 'border-bottom', '2px solid #4D80F4');
		if(element.value == ''){
			element.setAttribute('placeholder','');
			var child = document.createElement('span');
			child.textContent = label;
			child.setAttribute('style','font-weight:bold;position: absolute;top: -10px;');
			child.setAttribute('class','title');
			this.render2.insertBefore(element.parentElement,child,element);
		}
		
	}

	onBlur() {
		let element = this.el.nativeElement;
		this.render2.setStyle(element, 'border-bottom', '1px solid #CCCCCC');
		if(element.value == ''){
			var child = element.parentElement.querySelector('span.title');
			element.setAttribute('placeholder',child.textContent);
			this.render2.removeChild(element.parentElement,child);
		}
	}
}
