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
  }
  getLessonById(lessonId:number) {
    this.http.get<any>(`${this.apiUrl}/:courseId/lessons/:id`).subscribe((response) => {
    })
  }
  createLessonInCourse(courseId:number, lesson: Lesson):void{
      const url = `${this.apiUrl}/${courseId}/lessons`;
      const lessonData:Lesson = {
        id:-1,
        title: lesson.title,
        content: lesson.content,
        courseId: courseId
      };
     const res= this.http.post<any>(url, lessonData).subscribe((response) => {
       console.log('lesson added successfully:', response);
      lessonData.id = response.LessonId;
this.coursesServise.getCourseById(courseId).subscribe((course) => {
  course.lessons = course.lessons || [];
  course.lessons.push(lessonData);
  this.coursesServise.updateCourse(course);
  this.coursesServise.getCourses();


});  })
  }
  updateLessonById(courseId:number,lessonId:number,newLesson:Lesson):Observable<any> {
    console.log("in servise",lessonId,courseId);
    //return this.http.put(`http://localhost:3000/api/courses/${selctedCours}/lessons/${selectedlesson}`, updateData, { })
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`,newLesson)
  }
  deleteLessonById(courseId:number,lessonId:number):Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`)
  }
  deleteAllLessonsFromCourseById(courseId:number)
  {
    let allLessons=this.getLessonsInCourseById(courseId)
  }
  
}
