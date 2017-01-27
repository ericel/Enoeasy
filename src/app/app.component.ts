import { Component, OnInit, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MetaService } from 'ng2-meta';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
	constructor(
    private metaService: MetaService,
    vRef: ViewContainerRef,
    public toastr: ToastsManager
	){this.toastr.setRootViewContainerRef(vRef);}
  title = 'app works!';

  ngOnInit() {
    
  }

   
}
