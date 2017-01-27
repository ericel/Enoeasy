import { Component, OnInit,  NgZone, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { NgUploaderOptions } from 'ngx-uploader';
import { PageService } from '../../../../services/page/page.service';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
types = ['Politics', 'Education', 'Health', 'Opinion', 'Gossip', 'Secrets', 'Corruption'];
  title_0: boolean = false;
  title_1: boolean = false;
  pad_top: boolean = true;
  blogForm : FormGroup;
  options: NgUploaderOptions;
  response: any;
  submitted = false;
  hasBaseDropZoneOver: boolean;
  constructor(
    private fb: FormBuilder,
    private _pageService: PageService,
    @Inject(NgZone) private zone: NgZone,
    
  ) {
    this.options = new NgUploaderOptions({
      url: 'http://api.ngx-uploader.com/upload',
      autoUpload: true,
      calculateSpeed: true
    });
   }

  ngOnInit() {
     this.blogForm = this.fb.group({
      'blogCat': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'blogTitle': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(150)])],
      'blogDesc': [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(500)])],
      'blogFull': [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(100000)])]
    });
    
    this.blogForm.controls["blogCat"].valueChanges
     .debounceTime(1000) // wait a litle after the user input (ms)
     .subscribe(blogcat => {
        if(blogcat !== ''){
         this.pad_top = false;
        }
          this.blogForm.controls["blogTitle"].valueChanges
          .debounceTime(1000) // wait a litle after the user input (ms)
          .subscribe(title => {
              if(title !== '' && title.length > 29){
               this._pageService.createBlog(blogcat, title); 
               this.title_0 = true;
              }
          });
     });

    this.blogForm.controls["blogDesc"].valueChanges
          .debounceTime(1000) // wait a litle after the user input (ms)
          .subscribe(blogDesc => {
              if(blogDesc !== '' && blogDesc.length > 150){
               this._pageService.updateBlogDesc(blogDesc); 
               this.title_1 = true;
           }
     });


      this.blogForm.controls["blogFull"].valueChanges
          .debounceTime(1000) // wait a litle after the user input (ms)
          .subscribe(blogFull => {
              if(blogFull !== '' && blogFull.length > 500){
               this._pageService.updateBlogFull(blogFull); 
           }
     });

  }
  
  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = JSON.parse(data.response);
        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }


  submitForm(blog: any){
    this._pageService.publishBlog(blog)
    .then((success) => {
      this.submitted = true;
    })
  }
}
