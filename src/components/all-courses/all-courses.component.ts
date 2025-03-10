import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from '../../types/user';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import e from 'express';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CourseDetailsComponent } from '../course-details/course-details.component';
@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [AsyncPipe,RouterOutlet,CourseDetailsComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent  {
  courses$: Observable<Course[]>;
  userRole=''
 
  currentCourse: any; // משתנה כדי לשמור את הקורס הנוכחי


  
  constructor(private courseService: CourseService,private userService:UserServiceService,private router:Router) {
    this.userRole=this.userService.currentUser.role
    this.courses$ = this.courseService.courses$;
     // קבלת ה-Observable מהשירות
     const token = this.userService.token; // Assuming you have a method to get the token
     if(token)
     {
       this.getCourses();
     }
    
  }


  // ngOnInit(): void {
  //   // const token = this.userService.token; // Assuming you have a method to get the token
  //   // this.getCourses();
  // }
  getCourses(): void {
    this.courseService.getCourses();
  }

  add(course:Course): void {
    
    this.courseService.createCourse(course); // הוספת קורס חדש
  }
  navigateHome(
  ): void {
    this.router.navigate(['/home-page']);
  }
  join(courseId:number):void
  {
    this.courseService.enrollStudent(courseId)
  }
  exit(courseId:number):void
  {
    this.courseService.unenrolStudent(courseId)
  }
 
  //-----------------------check if user is woner of the course
  deleteCourse(course:Course):void{
    if(this.userService.currentUser.id==course.teacherId)
    {
       this.courseService.deleteCourse(course.id)
    }
   else{
    alert("you are not the owner of this course")
   }
  }
  editCourse(course:Course):void{
    this.router.navigate(['/home/courses/edit',course.title, course.description ,course.id,course.teacherId])
  }
  details(course:Course)
  {
    if (this.currentCourse === course) {
      this.currentCourse = null; // אם הקורס כבר מוצג, נסיר אותו
    } else {
      this.currentCourse = course; // אחרת, נעדכן את הקורס הנוכחי
    }
  }
  //---------------------check

}
