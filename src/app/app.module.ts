import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authInterceptorFn } from './services/auth/auth.interceptor';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HeaderComponent } from './components/header/header.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { BoardComponent } from './components/board/board.component';
import { QcaComponent } from './components/qca/qca.component';
import { ManagementComponent } from './components/management/management.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    ResetPasswordComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    TabsComponent,
    ConfirmationModalComponent,
    BoardComponent,
    QcaComponent,
    ManagementComponent,
    DataEntryComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptorFn])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
