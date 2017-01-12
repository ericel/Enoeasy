import { Component, ElementRef, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnimationService, AnimationBuilder } from 'css-animator';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, AfterViewInit {
  user = {
    password: '',
    email: ''
  };
  mode: string = 'signin';
  private _animator: AnimationBuilder;
  constructor(
  private _elementRef: ElementRef,
   animationService: AnimationService,
   private auth: AuthService,
   private router: Router
  ) {
    this._animator = animationService.builder();
    this.auth.signout();
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

 authenticate(provider : string) {
    this.auth.login(provider);
    //this.auth.authenticate(provider, this.user)
    //.subscribe(() => this.router.navigate(['']))
  }
 
}
