import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
showStyle: false;
isAuthorized: boolean = false;
searchThis;
  constructor(
    private _elementRef: ElementRef,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthorized = this._authService.isAuthorized();
  }
 
 focusChange(){
  if(this.showStyle) {
      return "#8ac53e";
    } else {
      return "red";
    }
 }

  reset() {
    this.searchThis = " ";
  }
}
