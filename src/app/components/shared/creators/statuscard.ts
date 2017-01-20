import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';

@Component({
  selector: 'app-statuscard',
   styles: [`

  md-card {
      margin: 10px 0;
      clear:both;
      background: #efefef ;
      border-radius: 0 !important;
      box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12) !important;
  }
  md-card span {
    width: 31%;
    float: left;
    text-align: center;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    color: #333;
  }
  md-card span i {
      margin-right: 5px;
  }
  md-card.update-status {
      margin-top: -10px;
  }
  textarea {
    border: none;
    background-color: #fff !important;
    outline: none;
    color: rgba(0,0,0,0.6);
    font-family: 'Helvetica', sans-serif;
    font-size: 20px;
    margin-bottom: 5px;
  }
  @media screen and (max-width: 768px){
     md-card {
      margin: 0px 0 10px 0;
      }

  }
  `],
  template: `
   <md-card class="no-sm "  [ngStyle]="{'background-color': newStatus.color}">
     <span (click)="toggleStatus()">
         <i class="fa fa-commenting-o fa-1x color-green" aria-hidden="true"></i> <em>Update Status</em>
     </span>
     <span routerLink="/action/start">
         <i class="fa fa-share-alt-square fa-1x color-primary" aria-hidden="true"></i> <em>Share a File</em>
     </span>
     <span routerLink="/action/start">
         <i class="fa fa-free-code-camp fa-1x color-red" aria-hidden="true"></i> <em>Start an Action</em>
     </span>
     <div class="clearfix"></div>
   </md-card>
   <md-card *ngIf="statusShow" class="update-status" [ngStyle]="{'background-color': newStatus.color}">
   <form  (ngSubmit)="onCreateStatus(tags.value)">
    <div class="form-group">
      <textarea class="form-control shadow-2" aria-label="Update Status"
      [(ngModel)]="newStatus.status"
      name="status"
      placeholder="E no easy ooh!"
      ></textarea>
      <tag-input [(ngModel)]='newStatus.tags' name="tags" id="tags"></tag-input>
       <app-colorcard class="pull-left"
              (selected)="onColorSelect($event)"
              [colors]="colors"
            >
     </app-colorcard>
      <button md-button type="submit" class="pull-right color-primary">post status</button>
     </div>
  </form>
   </md-card>
  `
 
})
export class StatusCard implements OnInit {
 @Output() createStatus = new EventEmitter();
 isAuthorized: boolean = false;
 user;
 tags;
 statusShow: boolean = false;
 colors: Array<string> = ['#737EA8','#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
 newStatus = {
    status: '',
    color: 'white',
    tags: this.tags
  };
  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService
    ) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });

       this._GeolocationService.getCurrentIpLocation().subscribe( value => {
         this.tags = [value.city, value.country, 'status updates'];
          this.newStatus = {
            status: '',
            color: 'white',
            tags: this.tags
          };
       });
  }
  
  toggleStatus() {
     this.statusShow = true;
  }
  onColorSelect(color: string) {
    this.newStatus.color = color;
  }

  onCreateStatus() {
    const { status, color, tags} = this.newStatus;

    if (status) {
      this.createStatus.next({ status, color, tags  });
    }

    this.reset();
    this.statusShow  = false;
  }

  reset() {
    this.newStatus = {
      status: '',
      color: 'white',
      tags: ''
    };
  }

}
