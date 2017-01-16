import { 
  Component,
   OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-eusers',
  templateUrl: './eusers.component.html',
  styleUrls: ['./eusers.component.css']
})
export class EusersComponent implements OnInit {
@Input() user = {};
@Output() checked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
