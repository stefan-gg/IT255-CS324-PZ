import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: Course[]
  userIsAuthor: boolean
  noCourses: boolean

  constructor(private courseService: CourseService, private router: Router) { 
    this.noCourses = false;
  }

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

        let data = result;
        if (data.length === 0) {
          this.noCourses = true
        } else {

          this.courseService.getPurchasedCourses(user[0].pk).subscribe((result: any) => {
            let array = result;
            for(let i = 0;i < array.length; i++) {
              if(array[i] == -1){
                this.noCourses = true;
              }
            }

            let tempArr = [];
            array.forEach(element => {

              console.log(element)
              for (let i = 0; i < data.length; i++) {
                if (element == data[i].id) {
                  tempArr.push(data[i]);
                }
              }
            });
            this.courses = tempArr;
          });
        }
      });
    }
  }
}
