import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AnimationService, AnimationBuilder } from 'css-animator';

@Component({
  selector: 'app-getingstarted',
  templateUrl: './getingstarted.component.html',
  styleUrls: ['./getingstarted.component.css']
})
export class GetingstartedComponent implements OnInit, AfterViewInit {
 showDailog: boolean = false;
 showDailogs: boolean = false;
 showDailogb: boolean = false;
  private _animator: AnimationBuilder;
  constructor(
  private _elementRef: ElementRef,
   animationService: AnimationService
  ) {
    this._animator = animationService.builder();
   }

  ngOnInit() {

  }
  ngAfterViewInit() {
    
  }
  openThis() {
  	
  	this.showDailog = true;

  }
  
  openThiss(){
  	this.showDailogs = true;
  }
  openThisb(){
  	this.showDailogb = true;
  }
  closeDailog(){
  	this.showDailog = false;
  }
  closeDailogs(){
  
      	  this.showDailogs = false;
      
  }
   closeDailogb(){
  	this.showDailogb = false;
  }

  closer(){
  	this._animator
      .setType('fadeOutDown')
      .setDelay(50)
      .setDuration(300)
      .hide(this._elementRef.nativeElement.querySelector('.testa'))
      .then(() => {
        
      });
  }
}
