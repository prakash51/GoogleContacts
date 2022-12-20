import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoaderComponent } from '../loader/loader.component';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports:[ MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    LoaderComponent,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers:[
    { provide: MAT_DIALOG_DATA, useValue: { }},
    {provide:MatDialogRef,useValue: {} }
  ]
})
export class SharedModule { }
