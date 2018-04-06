import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators , AbstractControl} from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import * as Config from '../config';
import {AuthService} from '../services/auth.service';
import {HomeComponent} from '../home/home.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[AuthService]
})
export class LoginComponent implements OnInit {
	title = 'Sign In';
	form: FormGroup;
	errorMessage : string;
	successMessage : string;

  constructor(
  	private formBuilder: FormBuilder, 
  	private auth_service : AuthService,
  	private _cookieService:CookieService,
  	private home: HomeComponent) { }

  ngOnInit() {
  	this.form = this.formBuilder.group({
		email: [null, [Validators.required, Validators.email]],
		password: [null, Validators.required]
    });
  }

  onSubmit() {
  	if(this.form.valid == false){
	  	Object.keys(this.form.controls).forEach(field => { // {1}
		  const control = this.form.get(field);            // {2}
		  control.markAsDirty();     
		});
	} else {
		let loginFormData = {
			'email' : this.form.get('email').value,
			'password' : this.form.get('password').value

		};
		
		this.auth_service.postLogin(loginFormData)
		.subscribe(res => {
			this.errorMessage = '';
			
			if(res.status == false) {
				this.errorMessage = 'Login failed, Email and password mismatched';
			} else {
				this._cookieService.put("_u", res.id);
				this.home.authentication = true;
				//this.successMessage = 'Welcome to '+ Config.APPLICATION_NAME+', Please Login now. <a href="/">Click Here</a>';
			}
		});
	}
  }

}
