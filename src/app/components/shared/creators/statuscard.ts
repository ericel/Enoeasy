import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-statuscard',
   styles: [`

  md-card {
      margin: 10px 0;
      width: 100%;
      clear:both;
      background: #efefef ;
      border-radius: 0 !important;
  }
  md-card span {
    width: 33%;
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
    background-color: transparent;
    outline: none;
    color: rgba(0,0,0,0.6);
    font-family: 'Helvetica', sans-serif;
    font-size: 20px;
    margin-bottom: 5px;
  }
  `],
  template: `
   <md-card class="no-sm shadow-1"  [ngStyle]="{'background-color': newStatus.color}">
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
   <form>
    <div class="form-group">
      <textarea class="form-control" aria-label="Update Status"
      [(ngModel)]="newStatus.status"
      name="status"
      placeholder="E no easy ooh!"
      ></textarea>
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
 statusShow: boolean = false;
 colors: Array<string> = ['#737EA8','#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
 newStatus = {
    status: '',
    color: 'white'
  };
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }
  
  toggleStatus() {
     this.statusShow = true;
     console.log('starting status')
  }
  onColorSelect(color: string) {
    this.newStatus.color = color;
    console.log(color);
  }
}