import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Course[]


  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.allCourses()
  }

  allCourses(): void{
    this.courseService.returnAllCourses().subscribe((result: any) => {
      this.courses = result;
    })
  }

  
}
