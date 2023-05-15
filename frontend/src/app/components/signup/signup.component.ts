import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ValidatorService } from 'src/app/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [ValidatorService],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private v: ValidatorService,
    private usersService: UsersService,
    private router: Router
    ) {}
    ngOnInit(): void {
      
    }
  hide = true;
  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.v.passwordMatch('password', 'confirmPassword') }
  );
  formData:any;
  onSignup() {
    
    if (this.signupForm.valid) {
      this.formData = this.signupForm.value;
      this.usersService.signup(this.formData)
      .subscribe({
        next: (data) => {
          console.log("this is data return by api -->");
          console.log(data);
          this.router.navigate([`/signup/verification/${data["result"]["_id"]}`]);
          this.signupForm.reset(this.signupForm.value)
        },
        error: (e) => console.error(e)
      });
      console.log("this is form value -->");
      console.log(this.formData);
    }
  }
  get fc() {
    return this.signupForm.controls;
  }
}
