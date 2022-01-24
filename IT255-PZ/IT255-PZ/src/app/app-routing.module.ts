import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "logout", component: LogoutComponent },
  { path: "course/:id", component: SingleCourseComponent },
  { path: "add-course", component: AddCourseComponent },
  { path: "my-courses", component: MyCoursesComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
