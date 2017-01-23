import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
@Component({
  selector: 'app-sharecard',
  template: `
  <div  class="shareform">
   <md-card>
   <div class="close"> <button  md-button (click)="close()">X</button></div>
     {{hello}}
  </md-card>
  </div>
  `,
  styles: [`
  .shareform .close [md-button]{
      min-width: 40px !important;
      border-radius: 100% !important;
      cursor:pointer;
      color: rgba(0, 0, 0, 0.54) !important;
   }
  .shareform {
    min-width: 200px !important;
  }
  .shareform textarea {
    min-height: 150px !important;
    margin: 10px 0 !important;
  }
  @media screen and (min-width: 688px){
    .shareform md-card {
      width: 500px !important;
    }
  }
  .shareform .close {
    position: absolute;
    right: 2px;
    top: 2px;
  }
  `],
  inputs: ['header']
 
})
export class ShareCard implements OnInit {
 @Output() createshare = new EventEmitter();
 isAuthorized: boolean = false;
 user;
@Input() header :any;
@Input() status = {};
 newshare = {
    share: '',
    tags: '',
    color: '#fff'
  };
  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService,
    private _dialog: MdDialog,
    private statusService: StatusService,
    ) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
    console.log(this.header); 
  }

   close() {
      this._dialog.closeAll();
  }
}

