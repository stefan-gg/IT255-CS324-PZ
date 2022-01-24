import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userIsAuthor: boolean
  username: string

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userCheck();
  }

  userCheck(): void {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));

    this.username = user[0].fields.username;

    if (user[0].fields.autor === false) {
      this.userIsAuthor = false;
    } else {
      this.userIsAuthor = true;
    }
  }

}
