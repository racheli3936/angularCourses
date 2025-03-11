import { Component, Input } from '@angular/core';
import { Course, Lesson } from '../../types/user';
import { LessonService } from '../../services/lesson.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {
 lesson:Lesson = {
    id:-1,
    courseId:-1,
    title: '',
    content: ''
  };
  @Input() currentCourse!: Course;
  @Input() currentLesson!: Lesson;
  constructor(private lessonService: LessonService) {}

  onSubmit() {
    console.log(this.currentLesson,"currentLeson");
    
    const courseId = this.currentLesson.courseId; // עדכן בהתאם למזהה הקורס
    const lessonId = this.currentLesson.id; 
    console.log(courseId,"courseId");
    console.log(lessonId,"lessonId");
    this.lesson.id=lessonId;
    this.lesson.courseId=courseId;
    // עדכן בהתאם למזהה הקורס
    this.lessonService.updateLessonById(courseId,lessonId, this.lesson).subscribe(
      res=>{console.log(res,"res update");
      this.lessonService.getLessonsInCourseById(courseId).subscribe((lessons) => {
        this.currentCourse.lessons = lessons;
        console.log("lessons",lessons);
      })
    },
      error=>{
        console.log("didnt sucsess to updte",error);
      }
    )
  };
};
