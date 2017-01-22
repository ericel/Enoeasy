import { Component, OnInit, Output, EventEmitter, Optional} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import { GeolocationService } from '../../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-questioncard',
  template: `
  <div  class="questionform">
   <md-card>
   <div class="close"> <button  md-button (click)="close()">X</button></div>
     <form *ngIf="isAuthorized" (ngSubmit)="onAskQuestion()">
     <div *ngIf="errorQuestion" class="alert alert-danger" role="alert">
       <strong>Error: </strong>Question Should be between 20 - 100 Characters!
     </div>
     <div *ngIf="errorTags" class="alert alert-danger" role="alert">
       <strong>Error: </strong>At least 1 tags is needed!
     </div>
     <div *ngIf="addedSuccess" class="alert alert-success" role="alert">
      <strong>Well done!</strong> You successfully asked a question.
    </div>
    <div class="form-group">
      <textarea autofocus class="form-control 
      shadow-2" 
      aria-label="Ask a Question"
      [(ngModel)]="newQuestion.question"
      name="question"
      placeholder="What's up? Ask your Question"
      ></textarea>
      <tag-input [(ngModel)]='newQuestion.tags' name="tags" id="tags"></tag-input>
      <button md-raised-button color="primary" type="submit" class="pull-right">post question</button>
     </div>
  </form>
  <div *ngIf="!isAuthorized" class="not-auth color-primary" routerLink="/signup">Click Here Log In to Post! It's easy and fast.</div>
  </md-card>
  </div>
  `,
  styles: [`
  .questionform .close [md-button]{
      min-width: 40px !important;
      border-radius: 100% !important;
      cursor:pointer;
      color: rgba(0, 0, 0, 0.54) !important;
   }
  .questionform {
    min-width: 200px !important;
  }
  .questionform textarea {
    min-height: 150px !important;
    margin: 10px 0 !important;
  }
  @media screen and (min-width: 688px){
    .questionform md-card {
      width: 500px !important;
    }
  }
  .questionform .close {
    position: absolute;
    right: 2px;
    top: 2px;
  }
  `]
 
})
export class QuestionCard implements OnInit {
 @Output() createQuestion = new EventEmitter();
 isAuthorized: boolean = false;
 user;
 tags;
 errorQuestion: boolean = false;
 errorTags: boolean = false;
 addedSuccess: boolean = false;
 colors: Array<string> = ['#737EA8','#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
 newQuestion = {
    question: '',
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

       this._GeolocationService.getCurrentIpLocation().subscribe( value => {
         this.tags = [value.city, value.country, 'status updates'];
          this.newQuestion = {
            question: '',
            tags: '',
            color: '#fff'
          };
       });
  }
  
  onAskQuestion() {
    this.errorQuestion = false;
    this.errorTags = false;
    const { question, tags, color } = this.newQuestion;
    if(!question){
      this.errorQuestion = true;
    } else if(!tags) {
      this.errorTags = true;
    } else {
      this.errorQuestion = false;
      this.errorTags = false;
    }
    if (question && tags) {
      let type = "Question";
     this.statusService.createQuestion( question, tags, color, type );
      this.addedSuccess = true;
      
      this.reset(); 
    }
  }

  reset() {
    this.newQuestion = {
      question: '',
      tags: '',
      color: '#fff'
    };
  }

   close() {
      this._dialog.closeAll();
  }
}

