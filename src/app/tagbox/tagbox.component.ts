import { Component, ElementRef,  OnInit } from '@angular/core';

@Component({
  selector: 'app-tagbox',
  templateUrl: './tagbox.component.html',
  styleUrls: ['./tagbox.component.css'],
  
})
export class TagboxComponent implements OnInit {
	name : string = '';
	tagSubmitText : string = '';
	constructor(private ele : ElementRef) { }

	ngOnInit() {
		this.name = this.ele.nativeElement.getAttribute('name');
		this.ele.nativeElement.querySelector('input[type=text]')
                                .addEventListener('keyup', this.onKeyUp.bind(this));
	}

	onKeyUp(event) {
		const text = this.ele.nativeElement.querySelector('input[type=text]').value;
		if(event.keyCode == 13 && text != '') {
			var tagText = this.ele.nativeElement.querySelector('.tag-text').innerHTML;
			tagText += `<em class="text-em" style="
					background: #f5f5f5;
					border: 1px solid #CCC;
					font-style: normal;
					padding: 3px;
					margin:3px 0 0 3px;
					display:inline-block">`+text+`</em>`;
			this.ele.nativeElement.querySelector('.tag-text').innerHTML = tagText;
			this.tagSubmitText += text+',';
			this.ele.nativeElement.setAttribute('value', this.tagSubmitText);
			this.ele.nativeElement.querySelector('input[type=text]').value = '';
			
		}
	}

}
