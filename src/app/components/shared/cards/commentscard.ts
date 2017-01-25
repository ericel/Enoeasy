import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-commentscard',
  template: `
   <div *ngFor="let comment of comments;  let i=index">
   <div *ngIf="i<limit">
    <md-card-header>
           <img md-card-avatar src="{{comment.avatar}}">
           <md-card-title><a routerLink="/user/{{ comment.uid }}/{{comment.username | slugify}}">{{comment.username | shorten: 8}}</a>  {{comment.createdAt | amTimeAgo:true}} ago!</md-card-title>
           <md-card-subtitle class="type-0">{{comment.comment}}</md-card-subtitle>
     </md-card-header>
     <div class="clearfix"></div>
    </div>
   </div>
   
  `,
  styles: [`
    md-card-header {
      height: auto !important;
      clear: both !important;
    }
  `]
 
})
export class CommentsCard implements OnInit {
@Input() status: any;
@Input() limit: any;
comments;
  constructor(
    private statusService: StatusService,
  ) { }

  ngOnInit() {
      this.statusService.getComments(this.status.sid).subscribe(value => this.comments = value);
  }

}

