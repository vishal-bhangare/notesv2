import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import { NotesComponent } from '../notes.component';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss'],
})
export class NoteDataComponent {
  constructor(
    public dialogRef: MatDialogRef<NoteDataComponent>,
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
  notesData: any = '';

  refreshNotesData() {
    this.notesService.getUserNotes(this.userId).subscribe({
      next: (data: any) => {
        this.notesData = data;
      },
      error: (e: any) => console.error(e),
    });
  }

  onClose(): void {
    console.log(this.notesData);

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
  onArchive() {
    let data = this.notesService.addToArchive(this.noteId);
    if (data) {
      this.refreshNotesData();
      console.log(data);
    } else {
      console.error(data);
    }
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
