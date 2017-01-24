import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-commentscard',
  template: `
   <div *ngFor="let comment of comments">
    <md-card-header>
           <img md-card-avatar src="{{comment.avatar}}">
           <md-card-title><a routerLink="/user/{{ comment.uid }}/{{comment.username | slugify}}">{{comment.username | shorten: 8}}</a>  {{comment.createdAt | amTimeAgo:true}} ago!</md-card-title>
           <md-card-subtitle class="type-0">{{comment.comment}}</md-card-subtitle>
     </md-card-header>
   </div>
   
  `,
  styles: [`
    md-card-header {
      height: auto !important;
    }
  `]
 
})
export class CommentsCard implements OnInit {
 @Input() status: any;
comments;
  constructor(
    private statusService: StatusService,
  ) { }

  ngOnInit() {
      this.statusService.getComments(this.status.sid).subscribe(value => this.comments = value);
  }

}

