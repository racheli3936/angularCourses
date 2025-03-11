import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../types/user';
import { log } from 'console';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isPressSignIn: Boolean = false
  signInForm!: FormGroup;
  @Output() userAdded = new EventEmitter<User>();
  constructor(private formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', [Validators.required, Validators.minLength(3)]],
        role: ['', Validators.required]
      }
    )
  }
  changePressSignin() {
    this.isPressSignIn = !this.isPressSignIn
  }
  OnSubmit() {
    
      let newUser: User = this.signInForm.value
      if(newUser.role!='teacher'&&newUser.role!='user')
      {
        alert("role must be teacher or user")
        return
      }
      else{
        this.userAdded.emit(newUser);

      }
  }

  get valid(): { [key: string]: AbstractControl } {
    return this.signInForm.controls
  }
}
