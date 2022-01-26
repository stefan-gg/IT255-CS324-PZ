import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
  courseDeleted: boolean
  enoughMoney: boolean
  purchase: boolean
  duration: number
  updated: boolean
  course: Course
  userIsAuthor: boolean;
  form: FormGroup

  constructor(private courseService: CourseService, private router: Router, private formBuilder: FormBuilder) {
    this.course = new Course(0, "", "", "", 0, "", 0);
    this.userIsAuthor = false;
    this.courseDeleted = false;
    this.enoughMoney = true;
    this.purchase = false;
    this.updated = false;
    this.duration = Math.floor(Math.random() * 40) + 5;

    this.form = formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      price: ['', Validators.required],
      imageURL: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {

    let user = JSON.parse(window.sessionStorage.getItem("loginData"));

    if (user === null) {
      this.router.navigate([""]);
    }

    if (user[0].fields.autor === false) {
      this.userIsAuthor = false;
    } else {
      this.userIsAuthor = true;
    }

    let url = window.location.href;
    let courseId = parseInt(url.slice(url.lastIndexOf('/') + 1));
    this.courseService.getCourse(courseId).subscribe((result: any) => {
      this.course = result;

      if (user[0].fields.balance < this.course.price) {
        this.enoughMoney = false;
      }

    });
  }

  deleteCourse() {
    let url = window.location.href;
    let courseId = parseInt(url.slice(url.lastIndexOf('/') + 1));

    this.courseService.deleteCourse(courseId).subscribe((result: any) => {
      if (result === "Course deleted") {
        this.courseDeleted = true
      }
    })
  }

  buy() {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));

    let data = {
      user_id: user[0].pk,
      course_id: this.course.id
    }

    this.courseService.addPurchase(data).subscribe((result: any) => {
      if (result == "Purchase added !") {
        this.purchase = true
      }
    });
  }

  update() {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));
    let id = this.form.get("id")?.value;

    
    if (id == "") {
      id = this.course.id;
    }

    let name = this.form.get("name")?.value;
    if (name == "") {
      name = this.course.name;
    }

    let short_description = this.form.get("shortDescription")?.value;
    if (short_description == "") {
      short_description = this.course.shortDescription;
    }

    let description = this.form.get("description")?.value;
    if (description == "") {
      description = this.course.description;
    }

    let price = this.form.get("price")?.value;
    if (price == "") {
      price = this.course.price;
    }

    let image_URL = this.form.get("imageURL")?.value;
    if (image_URL == "") {
      image_URL = this.course.imageURL;
    }

    let course = {
      id: parseInt(id),
      name: name,
      short_description: short_description,
      description: description,
      price: parseFloat(price),
      image_URL: image_URL
    };

    console.log(course);
    this.courseService.update(course, id).subscribe((result: any) => {
      if (result == "Course updated") {
        this.updated = true;
      }
    });
  }
}
