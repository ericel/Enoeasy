import { Component, OnInit,  NgZone, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { NgUploaderOptions } from 'ngx-uploader';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
instruct: boolean = true;
choose: boolean = false;
  constructor() { }

  ngOnInit() {
    this.countDown();
  }

countDown() {
    var i = 2;
     var myinterval = setInterval(() => {
        //document.getElementById("countdown").innerHTML = ": " + i;
        if (i === 0) {
            clearInterval(myinterval );
             this.instruct = false;
             this.choose = true;
        }
        else {
            i--;
        }
    }, 1000);
 }
}

@Component({
  template: `
  <div class="main">
  <div class="container-fluid">
   <div *ngIf="pad_top" class="padding-50"></div>
    <form class="bloform" [formGroup]="blogForm" (ngSubmit)="submitForm(blogForm.value)">
    
       <div class="form-group" [ngClass]="{'has-error':!blogForm.controls['blogcat'].valid && blogForm.controls['blogcat'].touched}">
       <div class="mar-10"><h1>What are you going to write about?</h1></div>
            <md-select placeholder="Choose Writing topic" [formControl]="blogForm.controls['blogcat']">
              <md-option *ngFor="let type of types" [value]="type">{{ type }}</md-option>
            </md-select>
            <div *ngIf="blogForm.controls['blogcat'].hasError('required') && blogForm.controls['blogcat'].touched" class="alert alert-danger">You must select a category</div>
      </div>
       
       <div *ngIf="title_0" class="form-group" [ngClass]="{'has-error':!blogForm.controls['blogTitle'].valid && blogForm.controls['blogTitle'].touched}">
        <div class="mar-10">A Good Titile Will Make a Difference</div>
        <md-input-container>
        <input md-input 
              placeholder="Blog Title (150 max)"
              maxlength="150"
              #characterCountHint [formControl]="blogForm.controls['blogTitle']">
        <md-hint align="end">{{characterCountHint.value.length}} / 150</md-hint>
        </md-input-container>
        <!-- The hasError method can work with the built in validators but custom validators as well -->
        <div *ngIf="blogForm.controls['blogTitle'].hasError('required') && blogForm.controls['blogTitle'].touched" class="alert alert-danger">You must include a Title.</div>
        <div *ngIf="blogForm.controls['blogTitle'].hasError('minlength') && blogForm.controls['blogTitle'].touched" class="alert alert-danger">Your Title must be at least 30 characters long.</div>
        <div *ngIf="blogForm.controls['blogTitle'].hasError('maxlength') && blogForm.controls['blogTitle'].touched" class="alert alert-danger">Your Title cannot exceed 150 characters.</div>
      </div>
     
        
        <div class="row form-group">
          <div class="col-md-4">
          <input type="file"
       ngFileSelect
       [options]="options"
       (onUpload)="handleUpload($event)"
       (beforeUpload)="beforeUpload($event)">
           <h1> This gives your page a nice view in social media plateforms.</h1>
           <div ngFileDrop
                [options]="options"
                (onUpload)="handleUpload($event)"
                [ngClass]="{'file-over': hasBaseDropZoneOver}"
                (onFileOver)="fileOverBase($event)">
            </div>
          </div>
           <div class="col-md-8"> 
            <div class="form-group" [ngClass]="{'has-error':!blogForm.controls['blogDesc'].valid && blogForm.controls['blogDesc'].touched}">
              <div class="mar-10">Don't let us decide what should appear as your page description!</div>
              <md-input-container>
              <textarea md-input 
                    md-input placeholder="Draft of what you will writeW"
                    maxlength="150"
                    #characterCountHintText [formControl]="blogForm.controls['blogDesc']"></textarea>
              <md-hint align="end">{{characterCountHintText.value.length}} / 500</md-hint>
              </md-input-container>
              <div *ngIf="blogForm.controls['blogDesc'].hasError('required') && blogForm.controls['blogDesc'].touched" class="alert alert-danger">You must Write a Daft.</div>
              <div *ngIf="blogForm.controls['blogDesc'].hasError('minlength') && blogForm.controls['blogDesc'].touched" class="alert alert-danger">Your Draft must be at least 150 characters long.</div>
              <div *ngIf="blogForm.controls['blogDesc'].hasError('maxlength') && blogForm.controls['blogDesc'].touched" class="alert alert-danger">Your Draft cannot exceed 500 characters.</div>
            </div>

          </div>
        </div>

         <button md-button md-raised-button color="primary" type="submit" [disabled]="!blogForm.valid" >Publish Your Blog</button>
    </form>
 </div>
  </div>
  `,
  styles: [`
  h1 {
    padding: 10px 0;
  }
  .mar-10 {
    margin: 10px 0;
  }
  .blogform {
    margin-top: 20px;
  }
   md-input-container, md-select {
     width: 100%;
   }
   .padding-50 {
     padding-top: 200px;
     padding-bottom: 20px;
   }
   .container-fluid {
     padding-right: 15px !important;
     padding-left: 15px !important;
     padding-top: 50px !important;
   }
   .file-over { border: dotted 3px red; } 
  `]
})
export class BlogComponent implements OnInit {
  types = ['Politics', 'Education', 'Health', 'Opinion', 'Gossip', 'Secrets', 'Corruption'];
  title_0: boolean = false;
  title_1: boolean = false;
  pad_top: boolean = true;
  blogForm : FormGroup;
  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  constructor(
    private fb: FormBuilder,
    @Inject(NgZone) private zone: NgZone
  ) {
    this.options = new NgUploaderOptions({
      url: 'http://api.ngx-uploader.com/upload',
      autoUpload: true,
      calculateSpeed: true
    });
   }

  ngOnInit() {
     this.blogForm = this.fb.group({
      'blogcat': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'blogTitle': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(150)])],
      'blogDesc': [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(500)])]
    });
    
    this.blogForm.controls["blogcat"].valueChanges
     .debounceTime(100) // wait a litle after the user input (ms)
     .subscribe(blogcat => {
        if(blogcat !== ''){
         this.title_0 = true;
         this.pad_top = false;
        }
     });

    this.blogForm.controls["blogTitle"].valueChanges
     .debounceTime(100) // wait a litle after the user input (ms)
     .subscribe(title => {
        if(title !== ''){
         this.title_1 = true;
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


  submitForm(id: string, value: any){
  
  }
}

