import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
@Component({
  selector: 'app-commentscard',
  template: `
    {{status.sid}}

  `,
  styles: [`

  `]
 
})
export class CommentsCard implements OnInit {
@Input() status: any;
id;
  constructor(
    private statusService: StatusService,
    ) { }

  ngOnInit() {
      //console.log(status);
      this.statusService.getComments('b04f42ccfc9a97a9418e6becf67516be').subscribe(value => console.log(value));
  }

}

