import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course, Lesson } from '../../types/user';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';
import { LessonService } from '../../services/lesson.service';
import { get } from 'node:http';
import { EditLessonComponent } from "../edit-lesson/edit-lesson.component";

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AddLessonComponent, EditLessonComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  lesssnsForCourse: Lesson[] = []
  @Input() details!: Course;
  showForm = false;
  showEditLesson = false;
  currentLessonToEdit!: Lesson
  constructor(private lessonService: LessonService) {
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
    const lessonId = lesson.id
    console.log(lessonId, "new lesonid");

    this.lessonService.deleteLessonById(this.details.id, lessonId).subscribe((response) => {
      console.log("lesson deleted successfully", response);
      this.getLessonsForCourse();
    })
  }
  editLesson(lesson: Lesson) {
    this.currentLessonToEdit = lesson
    this.showEditLesson = !this.showEditLesson
  }
}
