import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../types/user';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  lessons: Lesson[] = []
  private apiUrl = 'http://localhost:3000/api/courses'

  constructor(private http: HttpClient,private coursesServise:CourseService) { }
  getLessonsInCourseById(courseId:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons`)

    'get'
    '/:courseId/lessons'
  }
  getLessonById(lessonId:number) {
    this.http.get<any>(`${this.apiUrl}/:courseId/lessons/:id`).subscribe((response) => {

    })
    'get'
    '/:courseId/lessons/:id '
  }
  createLessonInCourse(courseId:number, lesson: Lesson):void{
      const url = `${this.apiUrl}/${courseId}/lessons`;
      const lessonData:Lesson = {
        lessonId:-1,
        title: lesson.title,
        content: lesson.content,
        courseId: courseId
      };
     const res= this.http.post<any>(url, lessonData).subscribe((response) => {
       console.log('lesson added successfully:', response);
      lessonData.lessonId = response.LessonId;
this.coursesServise.getCourseById(courseId).subscribe((course) => {
  course.lessons = course.lessons || [];
  course.lessons.push(lessonData);
  this.coursesServise.updateCourse(course);
  this.coursesServise.getCourses();


});
       
      })
      // return res;
//       const newCourse =this.coursesServise.getCourseById(courseId).subscribe((course)=>{
//         course.lessons.push(lessonData)
//         this.coursesServise.updateCourseById(courseId,course)
//       })
// this.coursesServise.ו
//       return 
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
