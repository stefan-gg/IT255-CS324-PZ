import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private errorMessage: string;

  constructor(private formbuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.errorMessage = "";
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    //let username = this.loginForm.get("username")?.value;
    //let password = this.loginForm.get("password")?.value;

    //let user = {
    //  username: username,
    //  password: password
    //}
  }

  dbChech(user: any) {
    this.userService.login(user).subscribe(result => {

    })
  }

}
