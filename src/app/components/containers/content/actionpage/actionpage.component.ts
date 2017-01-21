import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actionpage',
  templateUrl: './actionpage.component.html',
  styleUrls: ['./actionpage.component.css']
})
export class ActionpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.countDown();
  }

countDown() {
    var i = 5;
     var myinterval = setInterval(() => {
        document.getElementById("countdown").innerHTML = ": " + i;
        if (i === 0) {
            clearInterval(myinterval );
             //this.router.navigate([`/place/${this.placeID}/${this.convertToSlug(this.placeName)}`]);
        }
        else {
            i--;
        }
    }, 1000);
 }
}
