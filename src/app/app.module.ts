import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { TogglePanelDirective } from './toggle-panel.directive';
import { TextfocusDirective } from './textfocus.directive';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftComponent } from './dashboard/left/left.component';
import { RightComponent } from './dashboard/right/right.component';
import { HeadComponent } from './dashboard/head/head.component';
import { ComposemailComponent } from './dashboard/composemail/composemail.component';
import { TagboxComponent } from './tagbox/tagbox.component';


const appRouter: Routes = [
	
	{
		path : '',
		component : HomeComponent
	},
	
	{
		path : 'signup',
		component : RegistrationComponent
	},
	{
		path : 'forgetpassword',
		component : ForgetpasswordComponent
	}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetpasswordComponent,
    TogglePanelDirective,
    TextfocusDirective,
    HomeComponent,
    DashboardComponent,
    LeftComponent,
    RightComponent,
    HeadComponent,
    ComposemailComponent,
    TagboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRouter,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
