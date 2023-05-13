import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss']
})
export class NoteDataComponent {
  constructor(
    public dialogRef: MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  noteDataForm = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
  });
  onSubmit(){
    if(this.noteDataForm.valid){
      console.log(this.noteDataForm.value);
      
    }
  }

  isEdit = false;
  toggleEdit(){ this.isEdit = this.isEdit ? false : true}
}
