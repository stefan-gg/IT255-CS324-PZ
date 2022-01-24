import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));

    if (user === null) {
      this.router.navigate([""]);
    }
  }

}
