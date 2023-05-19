import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class authGuard {

  constructor(private usersService: UsersService, private router: Router) { }
  canActivate(): boolean {
    
    if (this.usersService.isLoggedIn()) {
      return true;
    }else{
      this.router.navigate(['/signin']);
      return false
    }
  }
}