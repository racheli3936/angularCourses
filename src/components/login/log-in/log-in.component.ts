import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../../types/user';
import { UserServiceService } from '../../../services/user-service.service';
import { error } from 'console';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
   isPressLogIn: Boolean = false
   logInForm!: FormGroup;
   @Output() loginUser = new EventEmitter<{email:string,password:string}>();
   constructor(private formBuilder: FormBuilder) {
     this.logInForm = this.formBuilder.group(
       {
         email: ['', Validators.email],
         password: ['', [Validators.required, Validators.minLength(3)]],
       }
     )
   }
   changePressLogin() {
     this.isPressLogIn = !this.isPressLogIn
   }
   OnSubmit() {
    // if (this.signInForm.invalid) {
     const emailPassword=this.logInForm.value;
     this.loginUser.emit(emailPassword);
   }
 
   get valid(): { [key: string]: AbstractControl } {
     return this.logInForm.controls
   }
}
