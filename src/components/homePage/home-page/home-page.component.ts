import { Component } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { Course, User } from '../../../types/user';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  currentCourses$: Observable<Course[]>
  avatarLetter = ''
  currentUser!:User
  constructor(private coursesServise: CourseService, private router: Router, userService: UserServiceService) {
    this.currentCourses$ = this.coursesServise.currentCourses$;
    this.avatarLetter = userService.currentUser.name[0];
    this.currentUser=userService.currentUser
  }

  // navigateCourses(): void {
  //   this.router.navigate(['/all-courses']);
  // }
}
