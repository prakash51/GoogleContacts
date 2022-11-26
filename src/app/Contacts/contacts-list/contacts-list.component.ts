import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { catchError,throwError } from 'rxjs';
import { Contacts, DeleteContacts } from 'src/app/Models/contacts.model';
import { GoogleContactsService } from 'src/app/service/google-contacts.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit {

  constructor(private _googleContactsService: GoogleContactsService, private _route: Router, 
    private _loader: LoaderService) { }
  public displayedColumns: string[] = ['select', 'names', 'number', 'emailId', 'edit', 'delete'];
  public dataSource: Contacts[];
  public selection = new SelectionModel<Contacts>(true, []);
  private _deleteContacts = new DeleteContacts();
  public loading$ = this._loader.loading$;
  
  ngOnInit(): void {
    this._getContacts();
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  public editContact(id: string): void {
    let editContact: Contacts = this.dataSource.find(ele => ele.resourceName == id);
    this._route.navigate(['/UserProfile', { edit: editContact.resourceName }]);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row) => this.selection.select(row));
    console.log(this.selection);
  }

  public multiDelete(): void {
    this.selection.selected.forEach(x => this._deleteContacts.resourceNames.push(x.resourceName));
    this._googleContactsService.deleteContacts(this._deleteContacts).pipe(catchError(err => {
      console.log(err)
      alert("Unable Process Your Request Please Try After Some Time");
      this.selection.clear();
      return throwError(() => err);
    })).subscribe(
      (x: any) => {
        console.log(x.status);
        if (x.statusCode == 200) {
          this._getContacts();
          alert("Contacts Deleted Successfully");
          this.selection.clear();
        }
        else {
          alert("Unable Process Your Request Please Try After Some Time");
        }
      }), (error: any) => console.log(error)
  }

  private _getContacts(): void {
    if (sessionStorage.getItem('AccessToken')) {
      this._googleContactsService.getContactsT().pipe(catchError(err => {
        alert("Unable Process Your Request Please Try After Some Time");
        return throwError(() => err);
      })).subscribe((data: any) => {
        console.log(data);
        this.dataSource = data?.connections;
        console.log(this.dataSource);
      });
    }
  }

  public delete(id: string) {
    this._googleContactsService.deleteContact(id).pipe(catchError(err => {
      alert("Unable Process Your Request Please Try After Some Time");
      return throwError(() => err);
    })).subscribe((x: any) => {
      if (x?.isSuccessStatusCode) {
        this._getContacts();
      }
    })
  }

}
