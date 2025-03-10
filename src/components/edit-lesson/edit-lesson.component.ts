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
  constructor(private lessonService: LessonService) {
   
  }

  onSubmit() {
    const courseId = this.currentCourse.id; // עדכן בהתאם למזהה הקורס
    const lessonId = this.currentLesson.id; // עדכן בהתאם למזהה הקורס
    this.lessonService.updateLessonById(courseId,lessonId, this.lesson)
  }
}
