import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-homecard',
  template: `
   <div class="row gutter-10">
   <div class="col-md-2 auth-1 no-sm-no">
     <md-card class="shadow-1" [ngStyle]="{'background-color': status.color}">
     <img md-card-avatar src="./assets/img/card.jpg">
     </md-card>
    <div>
      <h2>Oj Obasi</h2>
    </div>
   </div>
    <div class="col-md-10">
     <md-card class="status shadow-1">
      <md-card-header>
          <img md-card-avatar src="./assets/img/card.jpg">
          <md-card-title>{{status.username}} Posted  {{status.createdAt | amTimeAgo:true}} ago!</md-card-title>
          <span class="pull-right-set"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
          <md-card-subtitle class="type-0">{{status.type}}</md-card-subtitle>
      </md-card-header>
      <!--<img  md-card-image class="status-img" src="./assets/img/card.jpg">-->
      <md-card-content >
          <p>{{status.status}}</p>
      </md-card-content>
       <md-card-actions>
        <button md-button>LIKE</button>
        <button md-button>SHARE</button>
      </md-card-actions>
    </md-card>
   </div>
   </div>
  `,
  styles: [`
  md-card.status {
    padding:10px 0 !important;
  }
  .status-img {
    width:100% !important;
    margin: 0!important;
  }
  md-card.status md-card-content {
    min-height: 50px !important;
    padding:10px;
    font-family: 'Helvetica', sans-serif;
    font-size: 20px;
     display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    word-wrap: break-word;
    white-space: pre-line;
    box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12) !important;
  }
  .row {
    margin: 10px 0;
  }
  .auth-1 {
  text-align: center;
}
.auth-1 img{
  width: 100%;
  height: 100%;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.auth-1 md-card {
  width: 100%;
  height: 88px;
  border-radius: 4px;
  padding: 2px  !important;
  margin-left: auto;
  margin-right: auto;
  
  border-radius: 4px;
}

.row.gutter-10{
    margin-top: 10px;
}
.row.gutter-10:first-child{
  margin-top: 0;
}
.type-0 {
  font-style: italic;
}
.pull-right-set {
  position: absolute;
  top: 10px;
  right: 10px;
}
@media screen and (max-width: 600px){
md-card-header {
    margin: -8px 0 0;
    padding: 0 5px !important;
}
}
  `]
})
export class HomeCard implements OnInit {
@Input() status = {};
@Output() checked = new EventEmitter();
 isAuthorized: boolean = false;
 user;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }

}
