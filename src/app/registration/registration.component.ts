import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators , AbstractControl} from '@angular/forms';
import * as Config from '../config';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers :[AuthService]
})
export class RegistrationComponent implements OnInit {
  title = 'Create your  Account';
  form: FormGroup;
  emailExistError : string;
  successMessage : string;
  constructor(private formBuilder: FormBuilder, private auth_service : AuthService) { }
  MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmpassword').value; // to get value in input tag
        if(password != confirmPassword) {
           // console.log('false');
            AC.get('confirmpassword').setErrors( {MatchPassword: true} )
        } else {
            //console.log('true');
            return null
        }
    }
  ngOnInit() {
    this.form = this.formBuilder.group({
		firstname : [null, Validators.required],
		lastname : [null, Validators.required],
		email: [null, [Validators.required, Validators.email]],
		'passwords' : this.formBuilder.group({
			password: [null, Validators.required],
			confirmpassword : [null, Validators.required],	
		}, {
      validator: this.MatchPassword // your validation method
    })
		
    });
  }
  onSubmit() {
  	if(this.form.valid == false){
	  	Object.keys(this.form.controls).forEach(field => { // {1}
		  const control = this.form.get(field);            // {2}
		  if ( control instanceof  FormGroup) {
		  	 Object.keys(control.controls).forEach((subField)=>{
		  	 	control.controls[subField].markAsDirty();
		  	 	console.log(control.controls[subField]);
		  	 })
		  } else {
		  	control.markAsDirty();       // {3}	
		  }
		  
		});
	} else {
		let regFormData = {
			'firstname' : this.form.get('firstname').value,
			'lastname' : this.form.get('lastname').value,
			'email' : this.form.get('email').value,
			'password' : this.form.get('passwords.password').value

		};
		this.auth_service.postRegistration(regFormData)
		.subscribe(response => {
			this.emailExistError = '';
			if(response && response.status == 0) {
				this.emailExistError = response.message;
			} else {
				this.successMessage = 'Welcome to '+ Config.APPLICATION_NAME+', Please Login now. <a href="/">Click Here</a>';
			}
		});
	}
  }

}
