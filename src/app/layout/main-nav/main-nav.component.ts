import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserInfo } from 'src/app/Models/contacts.model';
import { GoogleAPIService } from 'src/app/service/google-api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  public userInfo:UserInfo;
  constructor(private _googleAPIService:GoogleAPIService) { }
 ngOnInit(): void {
    this._googleAPIService.userProfile$.subscribe((info)=>{
      this.userInfo=info;
    });
  }

}
