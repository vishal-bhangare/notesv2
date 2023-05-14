import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { VerificationService } from "../services/verification.service";

@Injectable({
  providedIn: 'root'
})
export class verificationGuard {

  constructor(private verificationService:VerificationService, private router: Router) { }
  canActivate(): boolean {
    if (this.verificationService.isAccountCreated()) {
      return true;
    }else{
      this.router.navigate(['/signup']);
      return false
    }
  }
}