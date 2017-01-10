import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing/listing.service';
import { Store } from './../../../store';
import 'rxjs/Rx';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
   notes = []
  constructor(
    private store: Store,
    private noteService: ListingService
  ) {
    
  }
 
 ngOnInit() {
   this.noteService.getNotes()
    .subscribe();

    this.store.changes.pluck('notes')
    .subscribe((notes: any) => { this.notes = notes;  console.log(this.notes)});
  
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
