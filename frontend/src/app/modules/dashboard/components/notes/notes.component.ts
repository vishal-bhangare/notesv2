import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { NoteDataComponent } from './note-data/note-data.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private notesService: NotesService
  ) {}
  notesData :any;
  openDialog(): void {
    let dialogRef = this.dialog.open(NoteDataComponent, {
      width: '40%',
      height: '60%',
      data: { title: 'hello', description: ' Ram' },
    });
  }
  show = false;
  ngOnInit(): void {
    this.notesService.getAllNotes().subscribe({
      next: (data) => {
        this.notesData = data;
        console.log(data);
        
      },
      error: (e) => console.error(e),
    });
  }
  setPlaceholder() {
    if (this.show) {
      $('#title').attr('placeholder', 'Title');
    } else {
      $('#title').attr('placeholder', 'Add new Note');
    }
  }
  outsideClick(hasClickedOutside: any) {
    this.show = hasClickedOutside ? false : true;
    this.setPlaceholder();
  }
  toggleAddNote() {
    this.show = this.show ? false : true;
    this.setPlaceholder();
  }

  addnoteForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  onAddNote() {
    if (this.addnoteForm.valid) {
      console.log(this.addnoteForm.value);
      this.addnoteForm.reset(this.addnoteForm.value)
    }
  }

  deleteNote(event: any) {
    const id = event.target.parentElement.parentElement.getAttribute('id');
    for (const index in this.notesData) {
      if (this.notesData[index].id == id) {
        this.notesData.splice(Number(index), 1);
      }
    }
  }
}
