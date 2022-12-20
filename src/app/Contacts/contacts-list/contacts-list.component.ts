import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Contacts, DeleteContacts } from 'src/app/Models/contacts.model';
import { GoogleContactsService } from 'src/app/service/google-contacts.service';
import { LoaderService } from 'src/app/service/loader.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { ContactProfileComponent } from '../contact-profile/contact-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['select', 'names', 'number', 'emailId', 'action'];
  public dataSource = new MatTableDataSource<Contacts>();
  public selection = new SelectionModel<Contacts>(true, []);
  private _deleteContacts = new DeleteContacts();
  public loading$ = this._loader.loading$;
  public showPopup:boolean=false;
  public popupTitle:string;
  public popupMessage:string;
  
  constructor(private _googleContactsService: GoogleContactsService, private _route: Router,
  private _loader: LoaderService,private _dialog:MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._getContacts();
    this._customFilter()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public viewContact(id:string)
  {
    let editContact: Contacts = this.dataSource.data.find(ele => ele.resourceName == id);
    this._dialog.open(ContactProfileComponent,{
      data:{
        resoucerName:editContact.resourceName,
        viewProfile:true,
      }
    })
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public editContact(id: string): void {
    let editContact: Contacts = this.dataSource.data.find(ele => ele.resourceName == id);
    this._route.navigate(['/UserProfile', { edit: editContact.resourceName }]);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    console.log(this.selection);
  }

  public multiDelete(): void {
    this.selection.selected.forEach(x => this._deleteContacts.resourceNames.push(x.resourceName));
    this._googleContactsService.deleteContacts(this._deleteContacts).pipe(catchError(err => {
      console.log(err)
      
      this.selection.clear();
      return throwError(() => err);
    })).subscribe(
      (x: any) => {
        console.log(x.status);
        if (x.statusCode == 200) {
          this._getContacts();
         // alert("Contacts Deleted Successfully");
          this._openSnackBar("Contacts Deleted Successfully","Ok");
          this.selection.clear();
        }
        else {
          //alert("Unable Process Your Request Please Try After Some Time");
          this._openSnackBar("Unable Process Your Request Please Try After Some Time","Ok");
        }
      }), (error: any) => console.log(error)
  }

  private _getContacts(): void {
    if (sessionStorage.getItem('AccessToken')) {
    }
    this._googleContactsService.getContactsT().pipe(catchError(err => {
     //alert("Unable Process Your Request Please Try After Some Time");
     this._openSnackBar("Unable Process Your Request Please Try After Some Time","Ok");
      //this._showPopup("Error","Unable Process Your Request Please Try After Some Time");
      return throwError(() => err);
    })).subscribe((data: any) => {
      console.log(data);
      this.dataSource.data = data?.connections;
      console.log(this.dataSource);
    });
  }

  public delete(id: string) {
    this._googleContactsService.deleteContact(id).pipe(catchError(err => {
      //alert("Unable Process Your Request Please Try After Some Time");
      this._openSnackBar("Unable Process Your Request Please Try After Some Time","Ok");
      return throwError(() => err);
    })).subscribe((x: any) => {
      if (x.statusCode == 200) {
        this._getContacts();
      }
    })
  }
  public applyFilter(filterValue: KeyboardEvent) {
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
  }

  private _customFilter() {
    this.dataSource.filterPredicate = function (record, filter) {
      let nameFound = record.names[0].unstructuredName.toLowerCase().indexOf(filter) != -1;
      let phoneNumberFound = Array.isArray(record?.phoneNumbers) ? record.phoneNumbers?.[0].value.indexOf(filter) != -1 : false;
      let emailFound = Array.isArray(record?.emailAddresses) ? record?.emailAddresses?.[0].value.indexOf(filter) != -1 : false;
      return (nameFound || phoneNumberFound || emailFound);
    }

  }

  public editcustomContact(ele:any)
  {
    console.log(ele);
  }
  private _openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
}
