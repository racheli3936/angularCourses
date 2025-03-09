import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Course } from '../../types/user';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseForm!: FormGroup
  constructor(private formBuilder: FormBuilder,private courseServise:CourseService) {
    this.addCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  OnSubmit(){
let newCourse:Course=this.addCourseForm.value
newCourse.lessons=[]
this.courseServise.createCourse(newCourse)
  }
  get valid() {
    return this.addCourseForm.controls
  }
}
