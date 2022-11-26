import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../Models/contacts.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 // accessToken:string;
 // public userProfile = new BehaviorSubject<UserInfo>(null);
  constructor(private _activedrouter:ActivatedRoute,private oAuthService:OAuthService) { 
    this._activedrouter.fragment.subscribe(async params=>{
      let x= await this.oAuthService.tryLogin()
      // this.oAuthService.tryLoginImplicitFlow().then(()=>{
      //   if (this.oAuthService.hasValidIdToken()) {
      //     this.oAuthService.loadUserProfile().then((info) => {
      //      this.userProfile.next(info as UserInfo);
      //      console.log(info);
      //      console.log(this.oAuthService.getAccessToken());
      //    })
      //  }
      // });
    //  this.accessToken=params
      
    });

  }

  ngOnInit(): void {
  }

}
