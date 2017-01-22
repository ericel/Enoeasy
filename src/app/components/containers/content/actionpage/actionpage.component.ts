import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actionpage',
  templateUrl: './actionpage.component.html',
  styleUrls: ['./actionpage.component.css']
})
export class ActionpageComponent implements OnInit {
 instruct: boolean = true;
 choose: boolean = false;
  constructor() { }

  ngOnInit() {
    this.countDown();
  }

countDown() {
    var i = 5;
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
