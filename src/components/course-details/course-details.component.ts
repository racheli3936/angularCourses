import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course, Lesson, User } from '../../types/user';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';
import { LessonService } from '../../services/lesson.service';
import { get } from 'node:http';
import { EditLessonComponent } from "../edit-lesson/edit-lesson.component";
import { UserServiceService } from '../../services/user-service.service';
import { MatIcon } from '@angular/material/icon';
import e from 'express';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AddLessonComponent, EditLessonComponent, MatIcon],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  lesssnsForCourse: Lesson[] = []
  @Input() details!: Course;
  showForm = false;
  showEditLesson = false;
  currentLessonToEdit!: Lesson
  currentUser!: User;
  constructor(private lessonService: LessonService, private userService: UserServiceService) {
    this.currentUser = this.userService.currentUser
  }
  ngOnInit() { }
  addLesson(course: Course) {
    this.showForm = !this.showForm;
    this.getLessonsForCourse();
  }
  getLessonsForCourse() {
    this.lessonService.getLessonsInCourseById(this.details.id).subscribe((response) => {
      this.lesssnsForCourse = response;
    })
  }

  deleteLesson(lesson: Lesson) {
    if (this.userService.currentUser.id !== this.details.teacherId) {
      alert("you are not the teacher of this course")
    }
    else {
      const lessonId = lesson.id
      this.lessonService.deleteLessonById(this.details.id, lessonId).subscribe((response) => {
        console.log("lesson deleted successfully", response);
        this.getLessonsForCourse();
      })
    }

  }
  editLesson(lesson: Lesson) {
    if (this.userService.currentUser.id !== this.details.teacherId) {
      alert("you are not the teacher of this course")
    }
    else {
      this.currentLessonToEdit = lesson
      this.showEditLesson = !this.showEditLesson
    }
  }
}
