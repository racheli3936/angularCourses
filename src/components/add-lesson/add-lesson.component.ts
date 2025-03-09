import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course, Lesson } from '../../types/user';
import { LessonService } from '../../services/lesson.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  lesson:Lesson = {
    lessonId:-1,
    courseId:-1,
    title: '',
    content: ''
  };
  @Input() currentCourse!: Course;
  constructor(private lessonService: LessonService) {
   
  }

  onSubmit() {
    const courseId = this.currentCourse.id; // עדכן בהתאם למזהה הקורס
    this.lessonService.createLessonInCourse(courseId, this.lesson)
      // .subscribe(response => {
      //   console.log('שיעור נוסף בהצלחה:', response);
      // }, error => {
      //   console.error('שגיאה בעת הוספת השיעור:', error);
      // });
  }
}
