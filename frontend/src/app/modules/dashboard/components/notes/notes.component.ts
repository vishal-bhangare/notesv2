import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { NoteDataComponent } from './note-data/note-data.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NotesService } from 'src/app/services/notes.service';
import { Router, RouterModule } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DashboardSnackbarComponent } from '../dashboard-snackbar/dashboard-snackbar.component';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
    public notesService: NotesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  openSnackbar(msg:string) {
    this.snackBar.open(msg, undefined,{
      duration: 1000
    });
  }

  notesData: any;
  userId: any;

  loadNotesData(id: any) {
    this.notesService.getUserNotes(id).subscribe({
      next: (data: any) => {
        this.notesData = data;
      },
      error: (e: any) => console.error(e),
    });
  }
  openSnackbarWithClose(msg:any){
    this.snackBar.openFromComponent(DashboardSnackbarComponent, {
      data: msg,
      duration:2500
    });
  }
  show = false;
  ngOnInit(): void {
    this.userId = this.usersService.getUserId();
    if (!this.userId) {
      alert('Unauthorized Access!!!');
      this.router.navigate(['/signin']);
    }

    this.loadNotesData(this.userId);
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
      let formData = this.addnoteForm.value;
      let data = {
        userId: this.userId,
        ...formData,
      };
      // console.log(data);
      this.notesService.createNote(data).subscribe({
        next: (data) => {
          this.addnoteForm.reset();
          this.openSnackbar('Note added successfully');
          this.loadNotesData(this.userId);
        },
        error: (e: any) => console.error(e),
      });
      // this.loadNotesData(this.userId);
    }
  }

  openDialog(noteId: any, title: any, description: any): void {
    let dialogRef = this.dialog.open(NoteDataComponent, {
      width: '40%',
      height: '60%',
      data: { noteId: noteId, title: title, description: description },
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.loadNotesData(this.userId);
    });
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
