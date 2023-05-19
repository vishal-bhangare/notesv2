import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { DashboardSnackbarComponent } from '../dashboard-snackbar/dashboard-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  viewType = 'list-view';
  userToken: any;
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private usersService: UsersService,
    private snackBar:MatSnackBar
  ) {}
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  userId:any;
  userName:any;
  userEmail:any;

  ngOnInit(): void {
    let model = $('.user-menu');
    let isHidden = true;
    let count = 0;
    this.userId = this.usersService.getUserId();
    this.userToken = this.usersService.getToken();
    if (!this.userId || !this.userToken)  {
      this.openSnackbarWithClose('Unauthorized Access!!!');
      this.router.navigate(['/signin']);
    }
    this.usersService.getProfile(this.userId).subscribe({
      next:(data:any)=>{
        this.userName = data["name"];
        this.userEmail = data["email"];
        
      },
      error:(err:any)=>{
        console.error(err);
        
      }

    })

    $('.navbar #right #userPic').on('click', () => {
      
      if (isHidden) {
        model.off("animationend");
        isHidden = false;
        model.attr("open","")
        model.show();
        count = 1
      } else {
        isHidden = true;
        model.attr("closing","")
        if(count){
          model.on("animationend",()=>{
            count = 0;
            console.log("Here");
            model.removeAttr("closing")
            model.removeAttr("open")
            model.hide();
          })
        }
      }
    });
    
  }
  openSnackbarWithClose(msg:any){
    this.snackBar.openFromComponent(DashboardSnackbarComponent, {
      data: msg,
      duration:2500
    });
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 700px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  logout() {
    this.usersService.doLogout();
  }
}
