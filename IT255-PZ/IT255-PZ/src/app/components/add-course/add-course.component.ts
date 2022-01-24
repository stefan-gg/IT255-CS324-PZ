import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  added: boolean
  form: FormGroup

  constructor(private courseService: CourseService, private formBuilder: FormBuilder, private router: Router) {
    this.added = false;

    this.form = formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      price: ['', Validators.required],
      imageURL: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));

    if (user === null || user[0].fields.autor !== true) {
      this.router.navigate(["home"]);
    }
  }

  update() {
    let user = JSON.parse(window.sessionStorage.getItem("loginData"));
    let name = this.form.get("name")?.value;
    let short_description = this.form.get("shortDescription")?.value;
    let description = this.form.get("description")?.value;
    let price = this.form.get("price")?.value;
    let image_URL = this.form.get("imageURL")?.value;

    let course = {
      name: name,
      short_description: short_description,
      description: description,
      price: parseFloat(price),
      image_URL: image_URL,
      autor_id: user[0].pk
    };

    this.courseService.addNewCourse(course).subscribe((result: any) => {
      if (result == "Course added") {
        this.added = true;
      }
    });
  }
}
