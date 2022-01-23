import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/models/course/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private BASE_URL = "http://127.0.0.1:8000/database/courses/";

  constructor(private httpClient: HttpClient) { }

  update(course: any): Observable<any> {
    const url = this.BASE_URL + "course/";
    return this.httpClient.put(url, course).pipe(map((response: any) => response));
  }

  addNewCourse(course: any): Observable<any> {
    const url = this.BASE_URL + "add-course/";
    return this.httpClient.post(url, course).pipe(map((response: any) => response));
  }

  returnAllCourses(): Observable<Course[]> {
    const url = this.BASE_URL + "get-all/";
    return this.httpClient.get(url).pipe(
      map((data: any) => data.map((item: any) => this.createCourseFromData(item)))
    );
  }

  private createCourseFromData(item: any) {
    return new Course(item.pk, item.fields.name, item.fields.short_description,
       item.fields.description, item.fields.price,
       item.fields.image_URL, item.fields.author_id)
  }

}