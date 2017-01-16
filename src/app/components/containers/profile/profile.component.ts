import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
id: string;
USER: any;
isAuthorized: boolean;
isAuth: boolean;
users: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private titleService: Title
  ) { }

  ngOnInit() {
   
  /*this.router.events.subscribe((url)=>{ this.route.params.subscribe(params => {
    this.titleService.setTitle(`${params['string'].replace(/ /g,".")} account profile`)
    });
  });*/
   
   this.route.params.subscribe(params => {
        this.id = params['id'];
        let str = params['string'];
        this._authService.userById(this.id)
        .subscribe(user => {this.USER = user;});
    this._authService.userAuth
    .subscribe(value => { 
    if(value){
        this._authService.checkThisLoginUserIs(this.id).subscribe(value => {if(value){ this.isAuth = true}});
    }});
    });

    this._authService._isUsers().subscribe(users => {this.users = users});
  }

}
