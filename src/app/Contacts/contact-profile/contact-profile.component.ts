import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Contacts, PhoneNumbers, Names, EmailAddresses } from 'src/app/Models/contacts.model';
import { GoogleContactsService } from 'src/app/service/google-contacts.service';

GoogleContactsService
@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.css']
})
export class ContactProfileComponent implements OnInit {
  private _contact = new Contacts();
  private _phoneNumber: PhoneNumbers = new PhoneNumbers();
  private _name: Names = new Names();
  private _emailAddress: EmailAddresses = new EmailAddresses();
  private _editContactId: string;
  public contactName: string;
  public contactNumber: number;
  public contactEmaiId: string;
  public buttonName: string = "Submit";
  public title: string;

  constructor(private _googleContactsService: GoogleContactsService,
    private _router: Router, private _activedrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this._activedrouter.params.subscribe(params => {
      this._editContactId = params['edit'];
    })
    if (this._editContactId) {
      this.title = "Update Contact"
      this._googleContactsService.getContact(this._editContactId).subscribe((contact: Contacts) => {
        this.contactName = contact.names[0]?.unstructuredName;
        this.contactNumber = + contact.phoneNumbers[0]?.value;
        this.contactEmaiId = contact.emailAddresses[0]?.value;
        this._contact.resourceName = contact.resourceName;
        this._contact.etag = contact.etag;
      });
    }
    else {
      this.title = "Create Contact";
    }
  }

  submit(form: NgForm) {
    let controls: NgForm["controls"] = form.controls;
    console.log(form);
    if (!this._editContactId) {
      !this._contact.names.length && this.loadFormControls(controls);
      this._googleContactsService.createContact(this._contact).pipe(
        catchError(err => {
          console.log(err)
          alert("Unable Process Your Request Please Try After Some Time");
          return throwError(() => err);
        })
      ).subscribe((x: Contacts) => {
        console.log(x);
        if (x.resourceName) {
          alert("Contact Created Successfully");
          form.reset();
        }
        else {
          alert("Unable Process Your Request Please Try After Some Time");
        }
      }
      )
    }
    else {
      !this._contact.names.length && this.loadFormControls(controls);
      this._googleContactsService.updateContact(this._contact).pipe(
        catchError(err => {
          console.log(err)
          alert("Unable Process Your Request Please Try After Some Time");
          return throwError(() => err);
        })
      ).subscribe((x: any) => {
        alert("Updated Contact  Successfully");
        this._router.navigate(['ContactsList']);
      })
    }
  }

  loadFormControls(controls: NgForm["controls"]): void {
    this._emailAddress.value = controls['emailId']?.value;
    this._phoneNumber.value = controls['phoneNumber']?.value.toString();
    this._name.givenName = controls['name']?.value;
    this._contact.emailAddresses.push(this._emailAddress)
    this._contact.phoneNumbers.push(this._phoneNumber);
    this._contact.names.push(this._name);
  }

}
