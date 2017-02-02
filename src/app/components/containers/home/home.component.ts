import { Component, OnInit,  ElementRef, Optional, ViewContainerRef } from '@angular/core';
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
  lastDialogResult: string; 
  statusesOk: boolean = false;
  constructor(
    private store: Store,
    private statusService: StatusService,
    private _dialog: MdDialog
    ) { }
  
  ngOnInit() {
 
   this.statusService.getStatus()
    .subscribe(statuses => { this.statuses = statuses; 
      if(this.statuses){
        this.statusesOk = true;
      }
      
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

  

  createRange(len=20) {
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