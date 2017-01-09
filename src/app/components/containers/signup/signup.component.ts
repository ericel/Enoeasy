import { Component, ElementRef, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnimationService, AnimationBuilder } from 'css-animator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, AfterViewInit {
  
  private _animator: AnimationBuilder;
  constructor(
  private _elementRef: ElementRef,
   animationService: AnimationService,
  ) {
    this._animator = animationService.builder();
   
   }

  ngOnInit() {
     
  }
  
  ngAfterViewInit() {
    this._animator
      .setType('shake')
      .setDelay(150)
      .setDuration(700)
      //.show(this._elementRef.nativeElement);
  }

 
}
