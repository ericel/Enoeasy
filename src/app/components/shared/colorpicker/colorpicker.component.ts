import {
  Component,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.css']
})
export class ColorpickerComponent {

  @Input() colors: Array<string> = [];
  @Output() selected = new EventEmitter<string>();
  isSelectorVisible: boolean = false;

  showSelector(value: boolean) {
    this.isSelectorVisible = value;
  }

  selectColor(color: string) {
    this.showSelector(false);
    this.selected.next(color);
  }
}
