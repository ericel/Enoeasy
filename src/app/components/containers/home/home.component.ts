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
  statuses = []
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
   
   this.statusService.getStatus()
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

}
