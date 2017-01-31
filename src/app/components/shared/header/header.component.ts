import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

isAuthorized: boolean = false;
 showStyle: false;
  searchThis;
  route: string;
  cat: string;
user; bg: string;
  constructor(
    private _elementRef: ElementRef,
    private _authService: AuthService,
    private router: Router,
    private location: Location
  ) {
     this.router.events.subscribe(event => {
       console.log(location.path());
         if(location.path() != ''){
            this.route = location.path();
            if(this.route === '/add'){
              this.bg = "#D32F2F";
              this.cat = "ADD"
            } else {
              this.bg = "#006064";
              this.cat = "HOME"
            }
          } else {
            this.route = 'Home'
            this.bg = "#006064";
            this.cat = "HOME"
          }
       });
   }

  ngOnInit() {
    this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }
 
focusChange(){
  if(this.showStyle) {
      return "#8ac53e";
    } else {
      return "#D32F2F";
    }
 }

  reset() {
    this.searchThis = " ";
  }

  logout(){
    this._authService.logout();
  }
}
