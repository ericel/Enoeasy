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
  onCreateStatus(status) {
    let type = "Status Update";
    this.statusService.createStatus(status, type)
    //.subscribe();
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