import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
 public color: ThemePalette = 'primary';
  constructor(private _loader:LoaderService) { }
  public loading$=this._loader.loading$;
  ngOnInit(): void {
  }

}
