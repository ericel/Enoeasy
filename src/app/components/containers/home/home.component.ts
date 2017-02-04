import { Component, OnInit,  ElementRef, Optional, ViewContainerRef,
 trigger,
  state,
  style,
  transition,
  animate,
  keyframes } from '@angular/core';
import { StatusService } from '../../../services/status/status.service';
import { Store } from './../../../store';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(300, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
]
})
export class HomeComponent implements OnInit {
  items;
  showMore: boolean = false;
  statuses = [];
  lastDialogResult: string; 
  statusesOk: boolean = false;
  next: number = 2;
  staggeringStatuses: any[] = [];
  constructor(
    private store: Store,
    private statusService: StatusService,
    private _dialog: MdDialog
    ) {  }
  
  ngOnInit() {
  
   this.statusService.getStatus()
    .subscribe(statuses => { this.statuses = statuses; 
      if(this.statuses){
        this.statusesOk = true;
      }
    
    this.doNext();
    });

   //this.addItems(0, this.sum);
   /*this.statusService.getStatus()
    .subscribe(statuses => this.statuses = statuses);
   
    /*this.store.changes.pluck('notes')
    .subscribe((statuses: any) =>  this.statuses = statuses);
    */
  }
 toggleShow() {
    this.showMore = !this.showMore;
  }


  onStatusChecked(status) {
    this.statusService.rateStatus(status);
  }
 

 doNext() {
    if(this.next < this.statuses.length) {
      this.staggeringStatuses.push(this.statuses[this.next++]);
    }
  }
  
  removeMe(i) {
   // this.staggeringStatuses.splice(i, 1);
  }

  createRange(len=30) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }

}


@Component({
  template: `
    <app-questioncard color="primary"></app-questioncard>
  `,
})
export class DialogAsk {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogAsk>) { }

 
 
}