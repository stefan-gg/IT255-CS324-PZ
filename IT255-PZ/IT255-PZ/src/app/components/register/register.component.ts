import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usernameError: boolean;
  passwordError: boolean;
  usernameLen: boolean;
  passwordLength = 0;
  usernameLength = 0;
  registerForm: FormGroup
  username: AbstractControl
  password: AbstractControl

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.usernameError = false;
    this.passwordError = false;
    this.usernameLen = false;
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required)
    });

    this.username = this.registerForm.controls['username'];
    this.password = this.registerForm.controls['password'];

    this.username.valueChanges.subscribe(
      (username: string) => {
        if (username.length < 5){
          this.usernameLength = username.length;
          this.usernameLen = true;
        } else {
          this.usernameLen = false;
        }
      }
    )

    this.password.valueChanges.subscribe(
      (password: string) => {
        if (password.length < 5){
          this.passwordError = true;
          this.passwordLength = password.length;
        } else {
          this.passwordError = false;
        }
      }
    )
  }

  ngOnInit(): void {
  }

  registerUsername(): void {
    let username = this.registerForm.get("username")?.value;
    let password = this.registerForm.get("password")?.value;
    console.log("**********");
    console.log(this.registerForm.get("username")?.value);
    let author = false
    if (this.registerForm.get("author")?.value === "True") {
      author = true;
    }

    let user = {
      username: username,
      password: password,
      author: author
    }
    this.dbRegister(user);
  }

  dbRegister(user: any){
    this.userService.register(user).subscribe(result => {
      if(result[0] === "Username exists !"){
        this.usernameError = true;
      } else {
        this.router.navigate([""]);
      }
    });
  }

}
