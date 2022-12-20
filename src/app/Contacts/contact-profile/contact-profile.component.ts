import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Contacts, PhoneNumbers, Names, EmailAddresses } from 'src/app/Models/contacts.model';
import { GoogleContactsService } from 'src/app/service/google-contacts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common';
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
 @ViewChild('ContactProfile') private _form:NgForm;
  public contactName: string;
  public contactNumber: number;
  public contactEmaiId: string;
  public buttonName: string = "Submit";
  public title: string;

  constructor(private _googleContactsService: GoogleContactsService,
    private _router: Router, private _activedrouter: ActivatedRoute,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { resoucerName: string, viewProfile: boolean },
    public contactProfileDialog: MatDialogRef<ContactProfileComponent>,private _location: Location) { }

  ngOnInit(): void {
    this._activedrouter.params.subscribe(params => {
      this._editContactId = params['edit'];
      if (this.data?.resoucerName) {
        this._getContactDetails("Contact Profile", this.data?.resoucerName);
      }
      if (this._editContactId) {
        this._getContactDetails("Update Contact", this._editContactId);
      }
      else {
        this.title = "Create Contact";
        this._form.reset();
      }
    })
  }

  submit(form: NgForm) {
    let controls: NgForm["controls"] = form.controls;
    console.log(form);
    if (!this._editContactId) {
      this.loadFormControls(controls);
      this._googleContactsService.createContact(this._contact).pipe(
        catchError(err => {
          this._openSnackBar("Unable Process Your Request Please Try After Some Time","Ok");
          return throwError(() => err);
        })
      ).subscribe((x: Contacts) => {
        console.log(x);
        if (x.resourceName) {
          this._openSnackBar("Contact Created Successfully","Ok");
          form.reset();
        }
        else {
          this._openSnackBar("Unable Process Your Request Please Try After Some Time","Ok");
        }
      }
      )
    }
    else {
      this.loadFormControls(controls);
      this._googleContactsService.updateContact(this._contact).pipe(
        catchError(err => {
          this._openSnackBar("Unable Process Your Request Please Try After Some Time","Ok");
          return throwError(() => err);
        })
      ).subscribe((x: any) => {
        this._openSnackBar("Updated Contact  Successfully","Ok");
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
  private _getContactDetails(title: string, contactId: string) {
    this.title = title;
    this._googleContactsService.getContact(contactId).subscribe((contact: Contacts) => {
      this.contactName = contact.names[0]?.unstructuredName;
      let phoneNumber = contact?.phoneNumbers?.[0]?.value;
      this.contactNumber = phoneNumber ? + phoneNumber : null;
      this.contactEmaiId = contact.emailAddresses?.[0]?.value;
      this._contact.resourceName = contact.resourceName;
      this._contact.etag = contact.etag;
    });
  }
  public closeDialog() {
    this.contactProfileDialog.close();
  }
  private _openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
  public cancel()
  {
    this._location.back();
  }
}
