import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from '../../types/user';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent  {
  courses$: Observable<Course[]>;
  userRole=''
  constructor(private courseService: CourseService,private userService:UserServiceService,private router:Router) {
    this.userRole=this.userService.currentUser.role
    this.courses$ = this.courseService.courses$;
     // קבלת ה-Observable מהשירות
     const token = this.userService.token; // Assuming you have a method to get the token
     if(token)
     {
       this.getCourses();
     console.log("ng on change");
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
    console.log(this.userService.currentUser);
    
        console.log(this.userService.currentUser.id);

    this.courseService.enrollStudent(courseId)
    console.log("join");
    
  }
  exit(courseId:number):void
  {
    this.courseService.unenrolStudent(courseId)
  }
  addCourse(){
    this.router.navigate(['/add-course'])
  }
  //-----------------------check if user is woner of the course
  // deleteCourse(courseId:number):void{
  //   this.courseService.deleteCourse()
  // }
  editCourse(course:Course):void{
    console.log("edit this",course);
    
    this.router.navigate(['/edit-course',course.title, course.description ,course.id,course.teacherId])
    //this.courseService.updateCourse(courseId,newCourse)
  }
  //---------------------check

}
