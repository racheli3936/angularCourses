import { Component } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { Course } from '../../../types/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  currentCourses$:Observable<Course[]>

  constructor(private coursesServise: CourseService, private router: Router,userService:UserServiceService) {
  this.currentCourses$ = this.coursesServise.currentCourses$;
  this.currentCourses$.subscribe(courses => {
    console.log(courses);
 });
 console.log("*************************");
 
 this.coursesServise.currentCourses$.subscribe(courses => {
  console.log(courses);})
  console.log("*************************");
    console.log(this.currentCourses$.forEach(c=>c));
    
  }  

  // navigateCourses(): void {
  //   this.router.navigate(['/all-courses']);
  // }
}
