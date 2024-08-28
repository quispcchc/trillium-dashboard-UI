import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authInterceptorFn } from './services/auth/auth.interceptor';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HeaderComponent } from './components/header/header.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    ResetPasswordComponent,
    HeaderComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(
      withFetch(), // Enable fetch API
      withInterceptors([authInterceptorFn]) // Use functional interceptor
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }