import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [{
   path:'',loadChildren:()=>import('./Contacts/contacts.module').then(m => m.ContactsModule),
  
},
{
  path:'login',component:LoginComponent
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
