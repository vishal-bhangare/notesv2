import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery';

@UntilDestroy()
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  viewType = 'list-view';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  ngOnInit(): void {
    // $(".user-menu-wrap").slideToggle("fast","swing");
    let model = $('.user-menu');
    //   autoOpen: false,
    //   position: { my: "right top", at: "right top", of: window }
    // });
    // });
    // const openModal = document.querySelector(".open-button");
    // const closeModal = document.querySelector(".close-button");
    let isHidden = true;
    let count = 0;
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
    // openModal.addEventListener("click", () => {
    //   model.showModal();
    // });

    // closeModal.addEventListener("click", () => {
    //   modal.setAttribute("closing", "");

    //   modal.addEventListener(
    //     "animationend",
    //     () => {
    //       modal.removeAttribute("closing");
    //       modal.close();
    //     },
    //     { once: true }
    //   );
    // });
  }
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private usersService: UsersService
  ) {}

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
