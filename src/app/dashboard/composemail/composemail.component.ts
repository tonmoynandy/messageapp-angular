import { Component, ElementRef , OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DashboardComponent} from '../dashboard.component';
import {TagboxComponent}  from '../../tagbox/tagbox.component';

@Component({
  selector: 'app-composemail',
  templateUrl: './composemail.component.html',
  styleUrls: ['./composemail.component.css']
})
export class ComposemailComponent implements OnInit {
	tag : TagboxComponent;
	minimize : boolean = false;
	maximize : boolean = false; 
	cc : boolean = true;
	bcc : boolean = true;
	textarea : ElementRef;
	message : string = '';
	subject : string = '';
	toAddress : string = '';
	ccAddress : string = '';
	bccAddress : string = '';
	form: FormGroup;
	constructor(
		private ele : ElementRef,  
		private dashboard : DashboardComponent,
		private formBuilder : FormBuilder) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			toAddress: [null],
			ccAddress: [null],
			bccAddress: [null],
			subject : [null],
			message: [null],
	    });
		this.textarea = this.ele.nativeElement.querySelector('.compose-textarea');
	}
	onClose() {
		this.dashboard.compose = false;
		this.cc = true;
		this.bcc = true;
	}
	onMinimize() {
		if(this.minimize == true) {
			this.minimize = false;
		} else {
			this.minimize = true;
		}
	}
	onCC() {
		this.cc = false;
		if(this.maximize == false) {
			if((this.cc == true && this.bcc == false) || (this.cc == false && this.bcc == true)) {
				this.changeTextAreaHeight(317);
			} else if(this.cc == false && this.bcc == false) {
				this.changeTextAreaHeight(285);
			} else {
				this.changeTextAreaHeight(349);
			}
		} else {
			if((this.cc == true && this.bcc == false) || (this.cc == false && this.bcc == true)) {
				this.changeTextAreaHeight(455);
			} else if(this.cc == false && this.bcc == false) {
				this.changeTextAreaHeight(423);
			} else {
				this.changeTextAreaHeight(487);
			}
		}
	}
	onBcc() {
		this.bcc = false;
		if(this.maximize == false) {
			if((this.cc == true && this.bcc == false) || (this.cc == false && this.bcc == true)) {
				this.changeTextAreaHeight(317);
			} else if(this.cc == false && this.bcc == false) {
				this.changeTextAreaHeight(285);
			} else {
				this.changeTextAreaHeight(349);
			}
		} else {
			if((this.cc == true && this.bcc == false) || (this.cc == false && this.bcc == true)) {
				this.changeTextAreaHeight(455);
			} else if(this.cc == false && this.bcc == false) {
				this.changeTextAreaHeight(423);
			} else {
				this.changeTextAreaHeight(487);
			}
		}
	}
	onMaximize() {
		this.minimize = false;
		if(this.maximize == false) {
			this.maximize = true;
			if(document.querySelector('.compose-widget')){
				document.querySelector('.compose-widget').style.height = '90vh';
				document.querySelector('.compose-container').style.width  = '100%';
				if((this.cc == true && this.bcc == false) || (this.cc == false && this.bcc == true)) {
					this.changeTextAreaHeight(455);
				} else if(this.cc == false && this.bcc == false) {
					this.changeTextAreaHeight(423);
				} else {
					this.changeTextAreaHeight(487);
				}
			}
		} else {
			this.maximize = false;
			document.querySelector('.compose-widget').style.height = '410px';
			document.querySelector('.compose-container').style.width  = '500px';
			
			if((this.cc == true && this.bcc == false) || (this.cc == false && this.bcc == true)) {
				this.changeTextAreaHeight(317);
			} else if(this.cc == false && this.bcc == false) {
				this.changeTextAreaHeight(285);
			} else {
				this.changeTextAreaHeight(349);
			}
			
		}
		
	}
	changeTextAreaHeight(height) {
		this.textarea.style.height = height+'px';
	}

	onSend() {
		this.toAddress = this.tag.tagSubmitText;
		console.log(this.toAddress);
	}
}
