import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class verificationGuard {

  constructor(private usersService: UsersService, private router: Router) { }
  canActivate(): boolean {
    if (this.usersService.isAccountCreated) {
      return true;
    }else{
      this.router.navigate(['/signup']);
      return false
    }
  }
}