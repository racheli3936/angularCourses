import { Routes } from '@angular/router';
import { AllCoursesComponent } from '../components/all-courses/all-courses.component';
import { AuthComponent } from '../components/auth/auth/auth.component';
import { HomePageComponent } from '../components/homePage/home-page/home-page.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { LogInComponent } from '../components/login/log-in/log-in.component';
import { Sign } from 'crypto';
import { SignInComponent } from '../components/signIn/sign-in/sign-in.component';
import path from 'path';
import { authGuard } from '../guards/auth.guard';
import { teacherGuard } from '../guards/teacher.guard';
//import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [ 
    {path:'auth',component:AuthComponent,
        children:[
            { path: 'login', component: LogInComponent },
            { path: 'signin', component: SignInComponent },
        ]
    },
    { 
        path: 'home', 
        component: HomePageComponent,
        children: [
          { path: 'courses', 
              component: AllCoursesComponent,
              children: [
                  { path: 'edit/:title/:description/:id/:teacherId', component: EditCourseComponent },
                  //{ path: 'delete', component: DeleteCourseComponent },
                 // { path: 'register-course', component: RegisterCourseComponent },
                  //{ path: 'leave-course', component: LeaveCourseComponent }
              ]},
          { path: 'add', component: AddCourseComponent,canActivate: [teacherGuard] },
        
        ],
        canActivate: [authGuard]
      },
    { path: '', redirectTo: '/auth', pathMatch: 'prefix' },
];
