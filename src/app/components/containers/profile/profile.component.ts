import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
id: string;
user: any;
  constructor(
    private route: ActivatedRoute,
    private _authService: AuthService
  ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
        this.id = params['id'];
        let str = params['string'];
        this._authService.userById(this.id)
        .subscribe(user => {this.user = user; console.log(this.user)});
    });
  }

}
