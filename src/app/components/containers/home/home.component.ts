import { Component, OnInit,  ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items;
  showMore: boolean = false;
  constructor() { }
  
  ngOnInit() {
  	this.items = [
     {
     title: 'Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005',
     color: 'skyblue'
    },
     {
     title: 'Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005',
     color: 'green'
    },
     {
     title: 'Angular2 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005',
     color: 'yellow'
    },
     {
     title: 'Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Angular2 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005 Angular2 Pipes Cheat Sheet by Nathane2005 Sheet by Nathane2005',
     color: 'black'
    },
     {
     title: 'Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005',
     color: 'white'
    },
     {
     title: 'gular2 Pipes Cheat Sheet by Nathane20 Angular2 Pipes Cheat Sheet by Nathane2005 www.cheatography', 
     desc: 'Angular2 Pipes Cheat Sheet by Nathane2005',
     color: 'white'
    }
    ]

  }
 toggleShow() {
    this.showMore = !this.showMore;
  }
}
