import { Component, OnInit,  ElementRef, Optional } from '@angular/core';
import { StatusService } from '../../../services/status/status.service';
import { Store } from './../../../store';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items;
  showMore: boolean = false;
  statuses = [];
  sum = 1;
  throttle = 500;
  scrollDistance = 10;
  lastDialogResult: string; 
  constructor(
    private store: Store,
    private statusService: StatusService,
    private _dialog: MdDialog
    ) { }
  
  ngOnInit() {
  	this.items = [
     {
     title: 'Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005',
     color: 'skyblue'
    }
    ]
   this.statusService.getStatus()
    .subscribe(statuses => { this.statuses = statuses;});

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
  onCreateStatus(status) {
    let type = "Status Update";
    this.statusService.createStatus(status, type)
    //.subscribe();
  }

  onAskQuestion(status) {
    let type = "Question";
    //this.statusService.createStatus(status, type)
    //.subscribe();
    console.log('okay');
  }
  
  onStatusChecked(status) {
    this.statusService.rateStatus(status);
  }

  openDialog() {
    let dialogRef = this._dialog.open(DialogAsk);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

}


@Component({
  template: `
    <app-questioncard></app-questioncard>
  `,
})
export class DialogAsk {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogAsk>) { }

 
 
}