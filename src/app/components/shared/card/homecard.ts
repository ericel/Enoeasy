import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-homecard',
  template: `
   <div class="row gutter-10">
   <div class="col-md-2 auth-1">
     <md-card class="shadow-1">
     <img md-card-avatar src="./assets/img/card.jpg">
     </md-card>
    <div>
      <h2>Oj Obasi</h2>
    </div>
   </div>
    <div class="col-md-10">
     <md-card>
      <md-card-header>
          <md-card-title>Header title</md-card-title>
          <md-card-subtitle>Header subtitle</md-card-subtitle>
      </md-card-header>
      <img md-card-image src="./assets/img/card.jpg">
      <md-card-content>
          <p>Here is some more content</p>
      </md-card-content>
    </md-card>
   </div>
   </div>
    <div class="row gutter-10">
   <div class="col-md-2 auth-1">
     <md-card class="shadow-1">
     <img md-card-avatar src="./assets/img/card.jpg">
     </md-card>
    <div>
      <h2>Oj Obasi</h2>
    </div>
   </div>
    <div class="col-md-10">
     <md-card>
      <md-card-header>
          <img md-card-avatar src="./assets/img/card.jpg">
          <md-card-title>Header title</md-card-title>
          <md-card-subtitle>Header subtitle</md-card-subtitle>
      </md-card-header>
      <img md-card-image src="./assets/img/card.jpg">
      <md-card-content>
          <p>Here is some more content</p>
      </md-card-content>
    </md-card>
   </div>
   </div>
    <div class="row gutter-10">
   <div class="col-md-2 auth-1">
     <md-card class="shadow-1">
     <img md-card-avatar src="./assets/img/card.jpg">
     </md-card>
    <div>
      <h2>Oj Obasi</h2>
    </div>
   </div>
    <div class="col-md-10">
     <md-card>
      <md-card-header>
          <img md-card-avatar src="./assets/img/card.jpg">
            <md-card-title>Header title</md-card-title>
            <md-card-subtitle>Header subtitle</md-card-subtitle>
        </md-card-header>
        <md-card-content>
            <p>Here is some more content</p>
            <p>Here is some more content</p>
            <p>Here is some more content</p>
        </md-card-content>
      </md-card>
     </div>
    </div>
  `,
  styles: [`
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
  `]
})
export class HomeCard implements OnInit {
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
