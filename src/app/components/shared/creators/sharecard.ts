import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-sharecard',
  template: `
  <div  class="shareform">
   <md-card>
   <div class="close"> <button  md-button (click)="close()">X</button></div>
     {{status.status}}
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
  `]
 
})
export class ShareCard implements OnInit {
 @Output() createshare = new EventEmitter();
 @Input() status: any;
  constructor(
    private _dialog: MdDialog,
    private statusService: StatusService,
    ) { }

  ngOnInit() {
     
  }

   close() {
      this._dialog.closeAll();
  }
}

