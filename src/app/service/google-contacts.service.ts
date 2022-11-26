import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, } from 'rxjs';
import { Contacts, DeleteContacts } from 'src/app/Models/contacts.model'
@Injectable({
  providedIn: 'root'
})
export class GoogleContactsService {
  public userContacts = new BehaviorSubject<Contacts[]>(null);
  
  constructor(private _httpClient: HttpClient) {
  }

  getContactsT() {
    return this._httpClient.get<Contacts[]>("http://localhost:5100/GoogleContacts/GetContacts") as BehaviorSubject<Contacts[]>;
  }
  getContacts():Promise<Contacts[]> {
   return firstValueFrom(this._httpClient.get<Contacts[]>("http://localhost:5100/GoogleContacts/GetContacts"));
 }
  deleteContacts(deleteContacts: DeleteContacts) {
    return this._httpClient.post("http://localhost:5100/GoogleContacts/DeleteContacts", deleteContacts);
  }

  createContact(newContact: Contacts) {
    return this._httpClient.post("http://localhost:5100/GoogleContacts/CreateContact", newContact);
  }

  getContact(contactId:string)
  {
    return this._httpClient.get<Contacts>("http://localhost:5100/GoogleContacts/GetContact",{params:{
      id:contactId
    }})
  }

  updateContact(updateContact:Contacts)
  {
    return this._httpClient.patch<any>("http://localhost:5100/GoogleContacts/UpdateContact",updateContact);
  }
  
  deleteContact(id:string) {
    return this._httpClient.delete("http://localhost:5100/GoogleContacts/DeleteContact",{params:{
      id:id
    }})
  }
}


