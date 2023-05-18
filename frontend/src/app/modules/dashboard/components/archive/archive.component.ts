import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import { ArchiveNoteDataComponent } from './note-data/note-data.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
    public notesService: NotesService,
    private router: Router
  ) {}
  notesData: any;
  userId: any;

  loadNotesData(this: any, id: any) {
    this.notesService.getArchivedNotes(id).subscribe({
      next: (data: any) => {
        this.notesData = data;
      },
      error: (e: any) => console.error(e),
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
  openDialog(noteId: any, title: any, description: any): void {
    let dialogRef = this.dialog.open(ArchiveNoteDataComponent, {
      width: '40%',
      height: '60%',
      data: { noteId: noteId, title: title, description: description },
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.loadNotesData(this.userId);
      if (response) {
        this.notesData = response;
      }
    });
  }
}
