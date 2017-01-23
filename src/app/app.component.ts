import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { MetaService } from 'ng2-meta';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
	constructor(
    private metaService: MetaService
	){}
  title = 'app works!';

  ngOnInit() {
    
  }

   
}
