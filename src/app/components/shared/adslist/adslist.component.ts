import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adslist',
  template:`
   <div class="mar-10"></div>
	<md-card>
  <ng2-adsense
    [adClient]="'ca-pub-2243338195594977'"
    [adSlot]="7979162777">
  </ng2-adsense>
 </md-card>
 <div class="mar-10"></div>
<md-card class="text-center">
   <md-card-subtitle>Share Your File And Earn Money!</md-card-subtitle>
   <md-card-title>Start making easy money from your comfort zone</md-card-title>   
   <md-card-content>
        <i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i>
       <h3><a routerLink="/gettingstarted">Get Started for free</a></h3>
     <h4>AfQuota offers<span>10</span> points free starter credits</h4>
   </md-card-content>
   <md-card-actions>
        <button md-button>Get Started</button>
        <button md-button>SHARE</button>
   </md-card-actions>
</md-card>
<div class="mar-10"></div>
<md-card>
<ng2-adsense
    [adClient]="'ca-pub-2243338195594977'"
    [adSlot]="7581452770">
  </ng2-adsense>
</md-card>
  `,
  styles: [`
   md-card {
     background: #efefef !important;
   }
  `]
})
export class AdslistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
