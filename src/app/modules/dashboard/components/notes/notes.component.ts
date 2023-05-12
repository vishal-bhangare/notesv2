import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery'
import { NoteDataComponent } from './note-data/note-data.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(NoteDataComponent, {
      width: '250px',
      data: { title: "hello",desc:" Ram" }
    });
  }
  show = false;
  ngOnInit(): void {
   
  }
  setPlaceholder(){
    if(this.show){
      $('#title').attr('placeholder','Title');
      }
      else{
        $('#title').attr('placeholder','Add new Note');
      }
  }
  outsideClick(hasClickedOutside: any) {
    this.show = hasClickedOutside ? false:true;
    this.setPlaceholder();
  }
  toggleAddNote(){
    this.show = this.show ? false:true;
    this.setPlaceholder();
  }

  notesData =[
  {
    id:1,
    title:"this is note 1",
    desc:"this is description of note 1 of userId 000"  
    },
  {
    id:2,
    title:"this is note 1",
    desc:"this is description of note 2 of userId 000"  
    },
  ]
  curNoteCount = 2;
  
  addNote(){
    if(this.show){
      const noteTitle = $('#title').val();
      const noteDesc = $('#description').val();
      $('#title').val("");
      $('#description').val("");
      const note = {
        id: ++this.curNoteCount,
        title:String(noteTitle),
        desc:String(noteDesc)
      }
      this.notesData = this.notesData.concat(note);
    }
  }
  deleteNote(event:any){
    const id = event.target.parentElement.parentElement.getAttribute('id');
    for(const index in this.notesData){
      if(this.notesData[index].id == id){
        this.notesData.splice(Number(index),1);
      }
    }
  }

}

