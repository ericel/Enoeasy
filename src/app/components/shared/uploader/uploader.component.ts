import {
  Component,
  Output,
  EventEmitter,
  OnInit, 
  NgZone
} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
colors: Array<string> = ['#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
fullForm: boolean = false;
 newCol = {
    color: 'white'
  };
  constructor() { }

   toggle(value: boolean) {
    this.fullForm = value;
  }
 
  
  ngOnInit() {

  }

   onColorSelect(color: string) {
    this.newCol.color = color;
  }
}
