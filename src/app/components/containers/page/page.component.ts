import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { PageService } from '../../../services/page/page.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
id: string;
page: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService
  ) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.id = params['id'];
        let str = params['string'];
      
        this._pageService.getPage(this.id).subscribe(page =>  console.log(page));
        this._authService.userById(this.id)
     });
  }

}
