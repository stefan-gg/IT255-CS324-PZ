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

  addPurchase(data: any) {
    const url = "http://127.0.0.1:8000/database/purchased/";
    return this.httpClient.post(url, data).pipe(map((response: any) => response));
  }

  getCourse(id: number) {
    const url = this.BASE_URL + "" + id;
    return this.httpClient.get(url).pipe(map((item: any) => this.createCourse(item)));
  }

  deleteCourse(id: number) {
    const url = this.BASE_URL + "" + id;
    return this.httpClient.delete(url).pipe(map((item: any) => item));
  }

  update(course: any, id: number): Observable<any> {
    const url = this.BASE_URL + "" + id;
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

  getAuthorCourses(id: number): Observable<Course[]> {
    const url = this.BASE_URL + "author/" + "" + id;
    return this.httpClient.get(url).pipe(
      map((data: any) => data.map((item: any) => this.createCourseFromData(item)))
    );
  }

  getPurchasedCourses(id: number) {
    const url = "http://127.0.0.1:8000/database/purchased/" + "" + id;
    return this.httpClient.get(url).pipe(
      map((data: any) => data.map((item: any) => this.returnId(item)))
    )
  }

  private returnId(item:any){
    if(item == -1){
      return -1
    }
    return item.fields.course_id
  }

  private createCourse(item: any) {

    return new Course(item[0].pk, item[0].fields.name, item[0].fields.short_description,
      item[0].fields.description, item[0].fields.price,
      item[0].fields.image_URL, item[0].fields.author_id)
  }

  private createCourseFromData(item: any) {
    
    return new Course(item.pk, item.fields.name, item.fields.short_description,
      item.fields.description, item.fields.price,
      item.fields.image_URL, item.fields.author_id)
  }

}