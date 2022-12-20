import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../Models/contacts.model';
import { GoogleAPIService } from '../service/google-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 // accessToken:string;
 // public userProfile = new BehaviorSubject<UserInfo>(null);
  constructor(private _googleAPIService:GoogleAPIService) { 
  }
  async SignIn():Promise<void>
  {
   await this._googleAPIService.login();
  }
  LoggedIn():boolean
  {
    sessionStorage.getItem('AccessToken')
    return this._googleAPIService.isLoggedIn();
  }
  ngOnInit(): void {
  }

}
