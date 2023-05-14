import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from 'src/app/validator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ValidatorService],

})
export class ResetPasswordComponent implements OnInit{
  constructor(private fb: FormBuilder, private v: ValidatorService) {}
  ngOnInit(): void { }
  resetPasswordForm = new FormGroup({
    password: new FormControl('',[
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]),
    confirmPassword: new FormControl('',[
      Validators.required
    ]),
  },
  { validators: this.v.passwordMatch('password', 'confirmPassword') });
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    }
  }
  get fc() { return this.resetPasswordForm.controls; }
}
