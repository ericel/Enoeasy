import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
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
    public toastr: ToastsManager,
    private router: Router
	){
    this.toastr.setRootViewContainerRef(vRef);
    this.router.events.subscribe(event => {
         const token_create_blog = window.localStorage.getItem("blog_create_token");
         if(token_create_blog) {window.localStorage.removeItem("blog_create_token")}

       });
 }
  title = 'app works!';

  ngOnInit() {

  }

   
}
