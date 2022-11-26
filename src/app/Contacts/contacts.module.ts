import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { AuthService } from '../service/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleContactsService } from '../service/google-contacts.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactProfileComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[ {
    provide:HTTP_INTERCEPTORS,useClass:AuthService,multi:true
  },GoogleContactsService,

]
})
export class ContactsModule { }
