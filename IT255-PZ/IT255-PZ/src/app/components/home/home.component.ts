import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchFilter: any = '';
  courses: Course[]
  userIsAuthor: boolean
  noCourses: boolean


  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.allCourses()
  }

  allCourses(): void {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));

    if (user === null) {
      this.router.navigate([""]);
    }

    if (user[0].fields.autor === false) {
      this.userIsAuthor = false;

      this.courseService.returnAllCourses().subscribe((result: any) => {
        if (result.length === 0) {
          this.noCourses = true
        } else {
          this.courses = result;
          this.courseService.getPurchasedCourses(user[0].pk).subscribe((result: any) => {
            let data = result;

            for (let index = 0; index < data.length; index++) {

              for (let indexx = 0; indexx < this.courses.length; indexx++) {

                if (this.courses[indexx].id === data[index]) {
                  this.courses.splice(indexx, 1);
                }

              }
            }
          });
        }

      });

    } else {
      this.userIsAuthor = true;

      this.courseService.getAuthorCourses(user[0].pk).subscribe((result: any) => {
        let niz = result;
        if (result.length === 0) {
          this.noCourses = true
        }
        this.courses = result;
        console.log(niz);
      });
    }

  }


}
