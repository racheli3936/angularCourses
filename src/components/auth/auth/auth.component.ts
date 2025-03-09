import { Component, OnInit } from '@angular/core';
import { ResponceSign, User } from '../../../types/user';
import { UserServiceService } from '../../../services/user-service.service';
import { LogInComponent } from '../../login/log-in/log-in.component';
import { SignInComponent } from '../../signIn/sign-in/sign-in.component';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from "../../homePage/home-page/home-page.component";
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LogInComponent, SignInComponent, HomePageComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  //users: User[] = []
  avatarLetter: string = ''
  isLogin: boolean = false
  constructor(private userService: UserServiceService,private courseService:CourseService) {

  }
  ngOnInit(): void {
    // this.loadUsers()
  }
  loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        console.log(users);
      },
      (error) => {
        console.error('Error getting users: ', error);
      }
    );
  }
  //   addUser(user:User)
  //   {
  // this.userService.createUser(user).subscribe(newUser=>this.users.push(newUser))
  //   }
  updateUser(userId: string, user: User) {
    this.userService.updateUser(userId, user).subscribe(res => {
      console.log("user update succes", res);
    }, error => {
      console.log("error in update", error);
    }
    )
  }
  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      //() => this.users = this.users.filter(user => user.ID !== userId)
    )
  }
  onUserAdded(user: User) { // פונקציה חדשה להאזנה לאירוע
    this.userService.createUser(user).subscribe((res: ResponceSign) => {
      console.log("signIn succes", res);
      console.log(res.userId)
      this.avatarLetter = this.userService.currentUser.name[0]
      console.log(this.userService.currentUser.id)
      this.isLogin = true
    }, error => {
      console.log("sign in didnt succes", error);
    }
    )
  }
  onUserLogIn(emailPassword:any)
  {
    this.userService.loginUser(emailPassword).subscribe(
      (res:any)=>
      {
        console.log(this.userService.currentUser);
        this.isLogin=true
        this.userService.getUserById().subscribe(
          (res)=>{
            console.log(res);
            this.avatarLetter=this.userService.currentUser.name[0]
          }
        )
        this.courseService.getCoursesForUser(this.userService.currentUser.id).subscribe(
          (res)=>{
            console.log("courses for user",res);
            this.userService.currentUser.courses=res
          }) 
      },
      (error)=>
      {
        console.log("log in didnt succes", error);
      }

    )
  }
}
