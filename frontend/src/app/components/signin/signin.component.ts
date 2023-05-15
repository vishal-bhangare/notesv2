import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    $('body').css('background', '#fff');
  }
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  formData: any;
  onSignin() {
    if (this.signinForm.valid) {
      this.formData = this.signinForm.value;
      this.usersService.signin(this.formData).subscribe({
        next: (data) => {
          this.cookieService.set('user-token',data["token"])
          this.cookieService.set('user-id',data["_id"])
          this.signinForm.reset(this.signinForm.value)
          this.router.navigate(['/dashboard']);
        },
        error: (e) => console.error(e),
      });
    }
  }
  hide = true;
  get fc() {
    return this.signinForm.controls;
  }
}
