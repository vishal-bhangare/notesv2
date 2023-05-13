import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  ngOnInit(): void {$("body").css("background","#fff")}
  signinForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[Validators.required]),
  });
  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
    }
  }
  hide = true;
  get fc() { return this.signinForm.controls; }
}
