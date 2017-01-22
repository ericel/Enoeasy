import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-asidecard',
  template: `
   <nav class="nav flex-column">
    <a class="nav-link" routerLink="/home"><i class="fa fa-home fa-1x" aria-hidden="true"></i> Home</a>
    <a class="nav-link" routerLink="/pages"><i class="fa fa-podcast fa-1x" aria-hidden="true"></i> Action Pages</a>
    <a class="nav-link" routerLink="/jobs"><i class="fa fa-briefcase fa-1x" aria-hidden="true"></i> Find a Jobs</a>
    <a class="nav-link" routerLink="/music"><i class="fa fa-headphones fa-1x" aria-hidden="true"></i> Music</a>
    <a class="nav-link" routerLink="/blogs"><i class="fa fa-rss fa-1x" aria-hidden="true"></i> Contributed Blogs</a>
    <a class="nav-link" routerLink="/places"><i class="fa fa-location-arrow fa-1x" aria-hidden="true"></i> Africa Places</a>
    <a class="nav-link" routerLink="/questions"><i class="fa fa-question-circle fa-1x" aria-hidden="true"></i> Answer a Questions</a>
    </nav> 
  `,
  styles: [`
    nav a {
        font-size: 1.2em;
        color: #666;
        transition: background-color .3s cubic-bezier(0,0,0.2,1);
        line-height: 40px;
    }
  
  `]
})
export class AsideCard implements OnInit {
 isAuthorized: boolean = false;
 user;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }

}
