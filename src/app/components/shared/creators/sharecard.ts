import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {SlugifyPipe} from 'ngx-pipes/src/app/pipes/string/slugify';
@Component({
  selector: 'app-sharecard',
  template: `
  <div  class="shareform">
  <div class="close"> <button  md-button (click)="close()">X</button></div>
   <md-card>
   {{statusUrl}}
        <share-buttons [shareTitle]="'Total Shares - '"
      [url]= 'statusUrl'
      [count]="true"
      [totalCount]="true"
      ></share-buttons>
  </md-card>
  </div>
  `,
  styles: [`
  .shareform .close [md-button]{
      min-width: 40px !important;
      border-radius: 100% !important;
      cursor:pointer;
      color: #fff !important;
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
    position: relative;
    right: 5px;
    top: -43px;
    color:#fff;
  }
  `],
  providers: [SlugifyPipe]
 
})
export class ShareCard implements OnInit {
 @Output() createshare = new EventEmitter();
 @Input() status: any;
 statusUrl;
  constructor(
    private _dialog: MdDialog,
    private statusService: StatusService,
    private slugifyPipe: SlugifyPipe
    ) { }

  ngOnInit() {
     this.statusUrl =  this.slugifyPipe.transform(`https://enoeasy-94b34.firebaseapp.com/${this.status.type}/${this.status.sid}/${this.status.status}/`);
     
  }

   close() {
      this._dialog.closeAll();
  }
}

