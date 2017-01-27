import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { PageService } from '../../../services/page/page.service';
import { StatusService } from '../../../services/status/status.service';
import { MetaService } from 'ng2-meta';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
@Input() status = {};
@Output() checked = new EventEmitter();
id: string;
page: any;
auth: any;
pageOk: boolean = false;
authOk: boolean = false;
comments: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService,
    private _statusService: StatusService,
    private metaService: MetaService
  ) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.id = params['id'];
        let str = params['string'];
        

        this._pageService.getPage(this.id).subscribe(page =>  {this.page = page; 
          if(this.page){
            this.pageOk = true;
            this.metaService.setTitle(this.page.status);
            //this.metaService.setTag('og:image',this.product.imageURL);
          } else {

          }
        this._authService.userById(this.page.uid).subscribe(auth => {this.auth = auth;
           if(this.auth){
            this.authOk = true;
          }
        });

      });
       this._statusService.getComments(this.id).subscribe(comments => this.comments = comments);  
    });

    
  }
  
  showLove(){
    this.checked.next(this.status);
  }
}
