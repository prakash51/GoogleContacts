import { HttpClientModule } from '@angular/common/http';
import {  ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { GlobalErrorHandlerService } from './service/global-error-handle.service';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: ErrorHandler, useClass:GlobalErrorHandlerService},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
