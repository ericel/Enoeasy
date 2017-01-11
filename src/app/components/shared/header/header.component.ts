import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
showStyle: false;
isAuthorized: true;
searchThis;
  constructor(
    private _elementRef: ElementRef,
  ) { }

  ngOnInit() {
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
