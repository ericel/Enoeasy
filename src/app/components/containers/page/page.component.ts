import { Component, OnInit, Input, EventEmitter, Output, Directive, ElementRef, OnChanges, Sanitizer, SecurityContext,
  SimpleChanges } from '@angular/core';
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
pageBlg: any;
isBlog: boolean = false;
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
            if(this.page.type !== "Status Update" && this.page.type !== "Question"){
              this._pageService.getPageBlg(this.id).subscribe(pageBlg =>  {this.pageBlg = pageBlg}); 
              this.isBlog = true;
            }
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
 htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
  
  showLove(){
    this.checked.next(this.status);
  }
}


@Component({
  selector: 'app-page-blog',
  templateUrl: './page.blog.component.html',
  styleUrls: ['./page.component.css']
})
// Sets the element's innerHTML to a sanitized version of [safeHtml]
@Directive({ selector: '[safeHtml]' })
export class BlogPageComponent implements OnInit {
@Input() safeHtml: string;
@Input() status = {};
@Output() checked = new EventEmitter();
id: string;
page: any;
auth: any;
pageOk: boolean = false;
authOk: boolean = false;
comments: any;
pageBlg: any;
isBlog: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService,
    private _statusService: StatusService,
    private metaService: MetaService,
    private elementRef: ElementRef, private sanitizer: Sanitizer
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
            if(this.page.type !== "Status Update" && this.page.type !== "Question"){
              this._pageService.getPageBlg(this.id).subscribe(pageBlg =>  {this.pageBlg = pageBlg}); 
              this.isBlog = true;
            }
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
  
   ngOnChanges(changes: SimpleChanges): any {
    if ('safeHtml' in changes) {
      this.elementRef.nativeElement.innerHTML =
        this.sanitizer.sanitize(SecurityContext.HTML, this.safeHtml);
    }
  }
  
  showLove(){
    this.checked.next(this.status);
  }
}
