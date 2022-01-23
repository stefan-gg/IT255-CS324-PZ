import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = "http://127.0.0.1:8000/database/users/";

  constructor(private httpClient: HttpClient) { }

  login(user: any): Observable<any> {
    const url = this.BASE_URL + "validate/";
    return this.httpClient.post(url, user).pipe(map((response: any) => response));
  }

  register(user: any): Observable<any> {
    const url = this.BASE_URL + "add-user/";
    return this.httpClient.post(url, user).pipe(map((response : any) => response));
  }
}
