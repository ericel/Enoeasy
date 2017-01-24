import { Component, OnInit, Output, EventEmitter, Optional, Input } from '@angular/core';
import { StatusService } from '../../../services/status/status.service';
@Component({
  selector: 'app-commentcard',
  template: `
     <div class="form-group">
         <form (keydown)="onCreateComment($event, status.sid)">
           <textarea class="form-control"
            [(ngModel)]="comment"
            name="comment"
            placeholder="Write a comment!"
           >
           </textarea>
         </form>
    </div>
  `,
   styles: [`
     textarea {
         height: 30px;
         overflow: hidden;
     }
  `]
 
})
export class CommentCard implements OnInit {
@Input() status = {};
comment: any;
  constructor(
      private statusService: StatusService,
    ) { }

  ngOnInit() {
    
  }

  onCreateComment(e, sid) {
    if(e.keyCode == 13) {

        if (this.comment) {
          this.statusService.createComment( this.comment, sid);
        }
   
       this.reset();
     }
  }

  reset() {

     this.comment = ''
  }

}
