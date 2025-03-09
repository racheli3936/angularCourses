import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course, Lesson } from '../../types/user';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';
import { LessonService } from '../../services/lesson.service';
import { get } from 'node:http';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AddLessonComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit{
  lesssnsForCourse: Lesson[] = []
  @Input() details!: Course;
  showForm = false;
  constructor(private lessonService: LessonService) {
    console.log("detauils constructor",this.details);
    
  //  this.getLessonsForCourse(this.details)
  }
  ngOnInit() {
    console.log("hjhjwere",this.details);
    
  }
  addLesson(course: Course) {

    this.showForm = !this.showForm;
    this.getLessonsForCourse(course)
  }
  getLessonsForCourse(course: Course) {
console.log(")))))))",course);

    this.lessonService.getLessonsInCourseById(course.id).subscribe((response) => {
      this.lesssnsForCourse = response;
      console.log(response,"lessomnssssssssss");
      
    })
  }
}
