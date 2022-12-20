import { Component, OnInit } from '@angular/core';
import { UserInfo } from './Models/contacts.model';
import { GoogleAPIService } from './service/google-api.service'
import { LoaderService } from './service/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Google-ContactsApi-POC';
  public loading$ = this._loader.loading$;

  constructor(private _loader: LoaderService, private _googleAPIService: GoogleAPIService) {

  }

  async SignIn(): Promise<void> {
    await this._googleAPIService.login();
  }

   LoggedIn(): boolean {
    return this._googleAPIService.isLoggedIn();
  }
}
