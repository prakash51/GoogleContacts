import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Models/contacts.model';
import { GoogleAPIService } from 'src/app/service/google-api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _googleAPIService:GoogleAPIService,private _route: Router,private _activedRoute:ActivatedRoute) { }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    // console.log($event['Window']);
     console.log("scrolling");
  }
  @Input('drawer') drawer:MatSidenav;
  public userInfo:UserInfo;
  public navbarFixed:boolean=false;
  // @HostListener('window:scroll',['$event']) onScroll()
  // {
  //   if(window.scrollY>100)
  //   {
  //     this.navbarFixed=true;   
  //   }
  //   else
  //   {
  //     this.navbarFixed=false;   
  //   }
  //   console.log(window.scrollY,this.navbarFixed);
  // }
  ngOnInit(): void {
    this._googleAPIService.userProfile$.subscribe((info)=>{
      this.userInfo=info;
    });
   
  }
  Signout():void{
    this._googleAPIService.signOut();
    sessionStorage.clear();
    this._route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this._route.navigate([''],);
    });
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
}
