import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {SlugifyPipe} from 'ngx-pipes/src/app/pipes/string/slugify';
@Component({
  selector: 'app-sharecard',
  template: `
  <div  class="updatestatus">
  <div class="auth-010">
    <span class="span"><strong><i class="fa fa-share-alt-square fa-1x" aria-hidden="true"></i> Share On Social</strong></span>
   </div>
  <div class="close"> <button  md-button (click)="close()">X</button></div>
   <md-card>
  <app-socialshare [status]="status"></app-socialshare>
  </md-card>
  </div>
  `,
  styleUrls: ['./creators.css'],
  providers: [SlugifyPipe]
 
})
export class ShareCard implements OnInit {
 @Output() createshare = new EventEmitter();
 @Input() status: any;
 statusUrl;statusDesc;statusPhotoUrl;
  constructor(
    private _dialog: MdDialog,
    private statusService: StatusService,
    private slugifyPipe: SlugifyPipe
    ) { }

  ngOnInit() {
     this.statusUrl =  `${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.status.status)}/`;
     if(this.status.type == "Status Update")
     {
       this.statusPhotoUrl = "https://www.idonsuffer.com/assets/img/_status.png";
     } else if (this.status.type == "Question"){
        this.statusPhotoUrl =  "https://www.idonsuffer.com/assets/img/_status_q.png";
     } else {
       this.statusPhotoUrl =  this.status.photoUrl;
     }
     this.statusDesc = encodeURIComponent(this.status.status.trim())
  }

   close() {
      this._dialog.closeAll();
  }
}

@Component({
  selector: 'app-socialshare',
  template: `
  <div class="row" style="text-align:center; margin:15px 0;">
   <div class="col-md-4" style="text-align:center;">
     <a class="btn btn-social btn-facebook" href="https://www.facebook.com/dialog/feed?app_id=1732300390419025
                &redirect_uri=https://www.idonsuffer.com/{{statusUrl}}
                &link=https://www.idonsuffer.com/{{statusUrl}}
                &picture={{statusPhotoUrl}}
                &caption=www.idonsuffer.com
                &description={{statusDesc}}.
                &properties={text:’value1′,key2:’value2′}
                &actions={name:’I LOVE Africa’,link:’https://www.idonsuffer.com’}">
                 <span class="fa fa-facebook-square">
       </span> Share On Facebook</a>
    </div>
    <div class="col-md-4" style="text-align:center;">
        <a class="btn btn-social btn-twitter"
        href="http://twitter.com/share?text={{status.status | shorten: 78: '..'}}&url=https://www.idonsuffer.com/{{statusUrl}}&hashtags=afroweb,idonsuffer,africanoneweb">
        <span class="fa fa-twitter-square">
       </span> Share On Twitter
        </a>
    </div>
    <div class="col-md-4" style="text-align:center;">
        <a class="btn btn-social btn-google"
        href="https://plus.google.com/share?url=https://www.idonsuffer.com/{{statusUrl}}">
        <span class="fa fa-google-plus-square">
       </span> Share On Google
        </a>
    </div>
 </div>
  `,
  styleUrls: ['./creators.css'],
  providers: [SlugifyPipe]
 
})
export class SocialCard implements OnInit {
 @Output() createshare = new EventEmitter();
 @Input() status: any;
 statusUrl;statusDesc;statusPhotoUrl;
  constructor(
    private _dialog: MdDialog,
    private statusService: StatusService,
    private slugifyPipe: SlugifyPipe
    ) { }

  ngOnInit() {
     this.statusUrl =  `${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.status.status)}/`;
     if(this.status.type == "Status Update")
     {
       this.statusPhotoUrl = "https://www.idonsuffer.com/assets/img/_status.png";
     } else if (this.status.type == "Question"){
        this.statusPhotoUrl =  "https://www.idonsuffer.com/assets/img/_status_q.png";
     } else {
       this.statusPhotoUrl =  this.status.photoUrl;
     }
     this.statusDesc = encodeURIComponent(this.status.status.trim())
     
  }
}


