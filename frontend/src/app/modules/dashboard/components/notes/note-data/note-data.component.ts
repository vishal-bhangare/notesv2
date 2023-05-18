import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import { NotesComponent } from '../notes.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';

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
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}
  openSnackbar(msg:string) {
    this.snackBar.open(msg, undefined,{
      duration: 1000
    });
  }
  noteId: any;
  userId: any;
  isEditable = false;
  ngOnInit() {
    this.noteId = this.data.noteId;
    console.log(this.noteId);

    this.userId = this.usersService.getUserId();
    this.toggleInputFields();
  }
  modified = false;

  onClose(): void {
    this.dialogRef.close(this.modified);
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
          this.modified = true;
          this.openSnackbar("Note saved.");
        },
        error: (e: any) => console.error(e),
      });
    }
  }
  onDelete() {
    this.notesService.addToTrash(this.noteId).subscribe();
    delay(1000)
    this.onClose();
    this.openSnackbar("This note is moved to trash");
  }
  onArchive() {
    let data = this.notesService.addToArchive(this.noteId);
    this.modified = true;
    this.openSnackbar("Note archived.");
    this.onClose();
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
