import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../Models/contacts.model';
import {environment} from 'src/environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class GoogleAPIService {
  private _userProfile = new BehaviorSubject<UserInfo>(null);
  public readonly userProfile$=this._userProfile.asObservable();
  constructor(private _oAuthService: OAuthService, private _httpClient: HttpClient) {
    this.signIn()
  }
  
    
  isLoggedIn(): boolean {
    return this._oAuthService.hasValidIdToken();
  }

  signOut() {
    this._oAuthService.logOut();
  }

  async signIn() {
    debugger
      this._oAuthService.configure(environment.OAuthConfig as AuthConfig);
      this._oAuthService.setupAutomaticSilentRefresh();
      await this._oAuthService.loadDiscoveryDocumentAndTryLogin();
      if(this._oAuthService.hasValidAccessToken()){
        sessionStorage.setItem('AccessToken',this._oAuthService.getAccessToken());
        let userpro = await this._oAuthService.loadUserProfile();
        console.log(userpro);
        this._userProfile.next(userpro as UserInfo);
      }
  }



  async login() {
    debugger
    if (!this._oAuthService.hasValidAccessToken()) {
      this._oAuthService.initImplicitFlow();
    }
    if(this._oAuthService.hasValidAccessToken()){
      await this._oAuthService.loadUserProfile().then((userProfile)=>{
        this._userProfile.next(userProfile as UserInfo)
      }).catch((err)=>{
        console.log(err)
      })
    }
    console.log(this._oAuthService.hasValidAccessToken());
  }
}
