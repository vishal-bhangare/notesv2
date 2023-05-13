import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ngOnInit(): void {
    $("body").css("background","#111111e8")
  }
  forgetPasswordForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
  });
  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      console.log(this.forgetPasswordForm.value);
    }
  }
  get fc() { return this.forgetPasswordForm.controls; }
}
