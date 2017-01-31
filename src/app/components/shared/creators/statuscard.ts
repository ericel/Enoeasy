import { Component, OnInit, Output, EventEmitter, Optional, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-statuscard',
  template: `
   <md-card class="no-sm "  [ngStyle]="{'background-color': newStatus.color}">
     <span mdTooltip="Update Status" (click)="toggleStatus()">
         <i class="fa fa-commenting-o fa-2x" color="primary"  aria-hidden="true"></i>
     </span>
     <span routerLink="/add" mdTooltip="Share a File">
         <i class="fa fa-share-alt-square fa-2x color-primary" aria-hidden="true"></i> 
     </span>
     <span routerLink="/add" mdTooltip="Start an Action">
         <i class="fa fa-free-code-camp fa-2x color-red" aria-hidden="true"></i>
     </span>
     <span (click)="openDialog()" mdTooltip="Ask a Question">
         <i class="fa fa-question fa-2x" aria-hidden="true"></i>
     </span>

     <span class="no-sm-no" (click)="openDialog()" mdTooltip="List a Place">
         <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
     </span>
     <div class="clearfix"></div>
   </md-card>
   <md-card *ngIf="statusShow" class="update-status" [ngStyle]="{'background-color': newStatus.color}">
   <form *ngIf="isAuthorized" (ngSubmit)="onCreateStatus(tags.value)">
    <div class="form-group">
      <textarea class="form-control shadow-2" aria-label="Update Status"
      [(ngModel)]="newStatus.status"
      name="status"
      placeholder="What's new with you?"
      ></textarea>
     </div>
       <app-colorcard class="pull-left"
              (selected)="onColorSelect($event)"
              [colors]="colors"
            >
     </app-colorcard>
      <button md-raised-button color="primary" type="submit" class="pull-right">post status</button>
     
  </form>
    <div *ngIf="!isAuthorized" class="not-auth color-primary" routerLink="/signup">Click Here Log In to Post! It's easy and fast.</div>
    <div class="clearfix"></div>
   </md-card>

  `,
   styles: [`

  md-card {
      margin: 10px 0;
      clear:both;
      border-radius: 0 !important;
      box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12) !important;

  }
  @media screen and (min-width: 1200px){
   md-card {
      border-radius: 4px !important;
      display: flex;
  }
  }
  md-card span {
    width: 25%;
    float: left;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    color: #333;
  }
  md-card span:last-child {
      float: right;
  }
  md-card.update-status {
      margin-top: -10px;
  }
  textarea {
    border: none;
    outline: none;
    color: rgba(0,0,0,0.6);
    font-family: 'Helvetica', sans-serif;
    font-size: 20px;
    margin-bottom: 5px;
  }
 
  @media screen and (max-width: 768px){
     md-card {
      margin: 0px 0 5px 0;
      }

  }
  .not-auth {
    padding: 10px 0;
    margin-bottom:10px;
    cursor: pointer;
  }
  tag-input {

    width: 100% !important;
  }
  @media screen and (min-width: 1300px){
  textarea, tag-input {
    min-width: 100% !important;
  }
  }
  `]
  /*<div class="form-group">
      <tag-input [(ngModel)]='newStatus.tags' name="tags"
      type="hidden" 
      id="tags"
      [maxItems]="4"
      separatorKeys="[32]"
      ></tag-input>*/
})
export class StatusCard implements OnInit {
 @Output() createStatus = new EventEmitter();
 @Input() status: any;
 lastDialogResult: string; 
 isAuthorized: boolean = false;
 user;
 tags;
 statusShow: boolean = false;
 colors: Array<string> = ['#737EA8','#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
 newStatus = {
    status: '',
    color: '#',
    tags: this.tags
  };
  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService,
    private _dialog: MdDialog
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
            color: '#',
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
      color: '#',
      tags: ''
    };
  }

  openDialog() {
    let dialogRef = this._dialog.open(DialogAsk);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  
}

@Component({
  template: `
    <app-questioncard></app-questioncard>
  `,
})
export class DialogAsk {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogAsk>) { }
}
