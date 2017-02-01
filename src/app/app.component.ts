import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
isDarkTheme: boolean = false;
isPurpleTheme: boolean = false;

route: string;
	constructor(
    private metaService: MetaService,
    vRef: ViewContainerRef,
    public toastr: ToastsManager,
    private router: Router,
    private location: Location
	){
    this.toastr.setRootViewContainerRef(vRef);
    this.router.events.subscribe(event => {
         const token_create_blog = window.localStorage.getItem("blog_create_token");
         if(token_create_blog) {window.localStorage.removeItem("blog_create_token")};

          console.log(location.path());
        if(location.path() != ''){
            this.route = location.path();
            if(this.route === '/add' || this.route === '/add/blog'){
              this.isDarkTheme = false;
              this.isPurpleTheme = true;
            } else {
              this.isPurpleTheme = false;
              this.isPurpleTheme = false;
            }
          } else {
            this.route = 'Home'
          }

       });

 }
  title = 'app works!';

  ngOnInit() {

  }

   
}
