import { Component, OnInit,  ElementRef } from '@angular/core';
import { StatusService } from '../../../services/status/status.service';
import { Store } from './../../../store';
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
   
  constructor(
    private store: Store,
    private statusService: StatusService
    ) { }
  
  ngOnInit() {
  	this.items = [
     {
     title: 'Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005',
     color: 'skyblue'
    }
    ]
   
   this.addItems(0, this.sum);
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
    this.statusService.createStatus(status)
    //.subscribe();
  }

   addItems(startIndex, endIndex) {
    for (let i = 0; i < this.sum; ++i) {
      this.statuses.push([i, ' ', this.statusArray()].join(''));
    }
  }
  onScrollDown () {
    console.log('scrolled!!');

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.addItems(start, this.sum) ;
  }
 

  statusArray() {
    return this.statusService.getStatus()
    .subscribe(statuses => this.statuses = statuses);
    
  }

}
