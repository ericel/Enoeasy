import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listcreator',
  templateUrl: './listcreator.component.html',
  styleUrls: ['./listcreator.component.css']
})
export class ListcreatorComponent {

  @Output() createNote = new EventEmitter();
  colors: Array<string> = ['#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
  newNote = {
    title: '',
    value: '',
    color: 'white'
  };
  fullForm: boolean = false;

  onCreateNote() {
    const { title, value, color } = this.newNote;

    if (title && value) {
      this.createNote.next({ title, value, color });
    }

    this.reset();
    this.fullForm = false;
  }

  reset() {
    this.newNote = {
      title: '',
      value: '',
      color: 'white'
    };
  }

  toggle(value: boolean) {
    this.fullForm = value;
  }

  onColorSelect(color: string) {
    this.newNote.color = color;
  }

}
