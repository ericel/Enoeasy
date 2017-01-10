import { Component, OnInit,
OnDestroy,
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/core';
import { ListingService } from '../../../services/listing/listing.service';
import { Store } from './../../../store';
import 'rxjs/Rx';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
   animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *', animate(300, style({opacity: 1}))),
      transition('* => void', animate(250))
    ])]
})
export class ListComponent implements OnInit {
   notes = []
  constructor(
    private store: Store,
    private noteService: ListingService
  ){
    this.noteService.getNotes()
    .subscribe();

    this.store.changes.pluck('notes')
    .subscribe((notes: any) =>  this.notes = notes);
  }
 
 ngOnInit() {
 
  
  }

  onCreateNote(note) {
    this.noteService.createNote(note)
    .subscribe();
  }

  onNoteChecked(note) {
    this.noteService.completeNote(note)
    .subscribe();
  }

  
}
