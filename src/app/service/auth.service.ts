import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthService implements HttpInterceptor{

  constructor(private  _oAuthService:OAuthService,private _loader:LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loader.show();
    const authReq = req.clone({ setHeaders: { 'Authorization':`Bearer ${this._oAuthService.getAccessToken()}` } });
    return next.handle(authReq).pipe(finalize(() => {
      this._loader.hide();
    }));
  }
}
