import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: boolean;
  form: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.errorMessage = false;
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required) 
    });
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    let username = this.form.get("username")?.value;
    let password = this.form.get("password")?.value;

    let user = {
      username: username,
      password: password
    }
    this.dbChech(user);
  }

  dbChech(user: any) {
    this.userService.login(user).subscribe(result => {
      if(result[0] === "Wrong username or password !"){
        this.errorMessage = true;
      } else {
        console.log(result[0].fields);
        window.sessionStorage.setItem("loginData", JSON.stringify(result))
        this.router.navigate(["home"]);
      }
    })
  }

}
