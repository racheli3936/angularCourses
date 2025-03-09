import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  lessons: Lesson[] = []
  private apiUrl = 'http://localhost:3000/api/courses'

  constructor(private http: HttpClient) { }
  getLessonsInCourseById() {
    'get'
    '/:courseId/lessons'
  }
  getLessonById() {
    'get'
    '/:courseId/lessons/:id '
  }
  createLessonInCourse() {
    'post'
    '/:courseId/lessons '
  }
  updateLessonById() {
    'put'
    '/:courseId/lessons/:id '
  }
  deleteLessonById() {
    'delete'
    '/:courseId/lessons/:id '
  }
}
