import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ValidatorService } from 'src/app/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [ValidatorService],
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private fb: FormBuilder, private v: ValidatorService) {}
  hide = true;
  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.v.passwordMatch('password', 'confirmPassword') }
  );
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
  get fc() {
    return this.signupForm.controls;
  }
}
