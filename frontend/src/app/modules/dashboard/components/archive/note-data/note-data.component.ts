import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-archive-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss']
})
export class ArchiveNoteDataComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ArchiveNoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notesService: NotesService,
    private usersService: UsersService
  ) {}

  noteId: any;
  userId: any;
  isEditable = false;
  ngOnInit() {
    this.noteId = this.data.noteId;
    console.log(this.noteId);

    this.userId = this.usersService.getUserId();
    this.toggleInputFields();
  }
  notesData: any;

  refreshNotesData() {
    this.notesService.getArchivedNotes(this.userId).subscribe({
      next: (data: any) => {
        this.notesData = data;
      },
      error: (e: any) => console.error(e),
    });
  }

  onClose(): void {
    this.dialogRef.close(this.notesData);
  }
  noteDataForm = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
  });
  onSave() {
    if (this.noteDataForm.valid) {
      let formData = this.noteDataForm.value;
      let data = {
        userId: this.userId,
        ...formData,
      };
      this.notesService.updateNote(data, this.noteId).subscribe({
        next: (data) => {
          this.refreshNotesData();
          alert('Note updated successfully');
        },
        error: (e: any) => console.error(e),
      });
    }
  }
  onDelete() {
    this.notesService.deleteNote(this.noteId).subscribe({
      next: (data) => {
        this.refreshNotesData();
        alert('note is deleted');
        this.onClose();
      },
      error: (e) => console.log(e),
    });
  }
  onUnarchive() {
    this.notesService.removeFromArchive(this.noteId).subscribe({
      next:(data)=>{
        console.log(data);
        
        this.refreshNotesData();
        delay(3000)
        this.onClose();
      },
      error:(err)=>console.log(err)
      

    });
  }
  toggleEdit() {
    this.isEditable = this.isEditable ? false : true;
    this.toggleInputFields();
  }
  toggleInputFields(): void {
    if (this.isEditable) {
      this.noteDataForm.controls['title'].enable();
      this.noteDataForm.controls['description'].enable();
    } else {
      this.noteDataForm.controls['title'].disable();
      this.noteDataForm.controls['description'].disable();
    }
  }
}
