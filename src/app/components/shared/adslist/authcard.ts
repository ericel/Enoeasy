import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-authcard',
  template: `
  <div class="mar-10"></div>
  <md-card
 *ngIf="isAuthorized"
 class="animated shake">
         <md-card-header>
            <img md-card-avatar src="{{ user.auth.photoURL }}" alt="{{ user.auth.displayName }}">
            <md-card-title><a routerLink="/user/{{ user.uid }}/{{user.auth.displayName | slugify}}">Hi {{user.auth.displayName}}</a></md-card-title>
            <md-card-subtitle><em>This is what you can do!</em></md-card-subtitle>
         </md-card-header>
         <md-card-content class="card-links">
                <div class="list-group">
                  <a routerLink="/action/start" class="list-group-item list-group-item-action "><i class="fa fa-free-code-camp fa-2x color-red" aria-hidden="true"></i> Start an Action page</a>
                  <a routerLink="/" class="list-group-item list-group-item-action"><i class="fa fa-share-alt-square fa-2x color-primary" aria-hidden="true"></i> Share a File</a>
                  <a routerLink="/" class="list-group-item list-group-item-action"><i class="fa fa-pencil-square-o fa-2x color-pink" aria-hidden="true"></i> Write a Blog</a>
                  <a routerLink="/" class="list-group-item list-group-item-action"><i class="fa fa-list fa-2x color-skyblue" aria-hidden="true"></i> List Things</a>
                  <a routerLink="/" class="list-group-item list-group-item-action"><i class="fa fa-briefcase fa-2x color-green" aria-hidden="true"></i> Post a Job</a>
                </div>
            </md-card-content>
   </md-card>
 <md-card
 *ngIf="!isAuthorized"
 class="animated shake">
         <md-card-header>
            <img md-card-avatar src="./assets/img/user-avatar.png">
            <md-card-title><a routerLink="/signup">Sign Up Or Log in</a></md-card-title>
            <md-card-subtitle><em>Claim your free AF10 credits</em></md-card-subtitle>
         </md-card-header>
   </md-card>
  `,
  styles: [`
  .card-links i{
    margin-right: 5px;
  }
  .list-group-item {
    border: none !important;
    padding: 0.5rem 0.5rem !important;
    }
    md-card-header {
    display: flex;
    flex-direction: row;
    height: 40px;
    margin: -8px 0 0px !important;
   }
   md-card, .list-group, .list-group-item {
     
   }
   
  `]
})
export class AuthCard implements OnInit {
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
