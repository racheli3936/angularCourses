import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Course } from '../../types/user';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {
  editCourseForm!:FormGroup
oldCourse!:Course
  constructor(private route:ActivatedRoute, private formBuilder:FormBuilder, private courseServise: CourseService) {
    this.editCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  ngOnInit()
  {
    this.route.params.subscribe(params => {
      this.oldCourse = {
        title: params['title'],
        description: params['description'],
        id: params['id'],
        teacherId: params['teacherId'],
        lessons: []
      };
    });
  }
  
  OnSubmit() {
    console.log("in submit");
    
    const newCourse: Course = this.editCourseForm.value;
    if (newCourse.title) {
      this.oldCourse.title = newCourse.title;}
    if (newCourse.description) {
      this.oldCourse.description = newCourse.description;
    }
    console.log("send......",this.oldCourse,newCourse);
    
    this.courseServise.updateCourse(this.oldCourse);
  
  }
  get valid() {
    return this.editCourseForm.controls
  }
}
