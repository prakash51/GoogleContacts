import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../authentication.guard';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
const routes: Routes = [
{ path: 'ContactsList', component:  ContactsListComponent,canActivate:[AuthenticationGuard]},
{ path: '',component:  ContactsListComponent},
{path:'UserProfile',component:ContactProfileComponent,canActivate:[AuthenticationGuard]}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
