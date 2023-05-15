import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private cookieService: CookieService
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
          console.log('this is data return by api -->');
          this.cookieService.set('user-token',data["token"])
          console.log(data["token"]);
        },
        error: (e) => console.error(e),
      });
      console.log('this is form value -->');
      console.log(this.formData);
    }
  }
  hide = true;
  get fc() {
    return this.signinForm.controls;
  }
}
