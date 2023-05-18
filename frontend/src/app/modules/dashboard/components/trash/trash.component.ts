import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public notesService: NotesService,
    private router: Router
  ) {}
  notesData: any;
  userId: any;

  loadNotesData(this: any, id: any) {
    this.notesService.getDeletedNotes(id).subscribe({
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
  onRestore(id:any){
    this.notesService.restoreFromTrash(id).subscribe({
      next:(data:any)=>{
        this.loadNotesData(this.userId)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
