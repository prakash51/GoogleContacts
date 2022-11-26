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

LoaderComponent
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
    MatButtonModule
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
    MatButtonModule
  ]
    
})
export class SharedModule { }
