import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  currentUserEmail: any;
  constructor(private usersService:UsersService){}
  ngOnInit(): void {
    this.currentUserEmail = this.usersService.currentUserData["result"]["email"]
    $("body").css("background","#111111e8")
  }
}
