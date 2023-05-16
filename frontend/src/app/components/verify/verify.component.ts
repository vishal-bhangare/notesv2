import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  token: any;
  id: any;
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    $('body').css('background', '#111111e8');
    this.token = this.route.snapshot.paramMap.get('token');
    this.id = this.token['userId'];
    this.usersService.verifyUser(this.token).subscribe({
      next: (data) => {
        console.log(data);
        
      },
      error: (e) => console.error(e),
    });;
  }
  gotoDashboard(){
    this.usersService.tokenSignin(this.id).subscribe({
      next: (data) => {
        this.cookieService.set('user-token',data["token"])
        this.router.navigate(['/dashboard']);
      },
      error: (e) => console.error(e)
    });
    
  }
}
