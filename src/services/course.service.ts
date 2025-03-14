import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { Course } from '../types/user';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private coursesSubject = new BehaviorSubject<any[]>([]);
  public courses$ = this.coursesSubject.asObservable();
  private currentCoursesSubject = new BehaviorSubject<Course[]>([]);
  currentCourses$ = this.currentCoursesSubject.asObservable();
  constructor(private http: HttpClient, private userServise: UserServiceService) { }

  getCourses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.coursesSubject.next(data);
        // עדכון המצב של הקורסים
        console.log(data);

      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }
  getCourseById(courseId: number): Observable<any> {
 
    return this.http.get(`${this.apiUrl}/${courseId}`);
  }
  getCoursesForUser(userId: number): Observable<any> {

   return this.http.get<any[]>(`${this.apiUrl}/student/${userId}`).pipe(
    tap(res => {
      console.log(res);

      this.currentCoursesSubject.next(res);
    })
  );
  }
  createCourse(course: Course): void {
    this.http.post(this.apiUrl, course).subscribe(
      (response) => {
        console.log("the course add successfully", response);
        this.getCourses(); // טען מחדש את הקורסים לאחר יצירה
      },
      (error) => {
        console.error('Error creating course', error);
      }
    );
  }
updateCourse(course:Course){
    const courseId=course.id;
    const url = `${this.apiUrl}/${courseId}`;
    const body = {
      title: course.title,
      description: course.description,
      teacherId: course.teacherId
    };
    console.log("techerId",course.teacherId);
    console.log("userID",this.userServise.currentUser.id);
    
if(course.teacherId==this.userServise.currentUser.id)(
   this.http.put(url, body).subscribe(
      (response) => {console.log('Course updated successfully', response);
        this.getCourses();
      },
      (error) => {
        console.log('Error updating course', error);
      })
)
else{
  alert("you are not the owner of the course")
}
  }

  deleteCourse(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      (response) => {
        this.getCourses(); // טען מחדש את הקורסים לאחר מחיקה
      },
      (error) => {
        console.error('Error deleting course', error);
      }
    );
  }
  enrollStudent(courseId: number): void {
    console.log("coursID:", courseId);

    let user = this.userServise.currentUser
    let userId = user.id;
    console.log("userId:", userId);
    this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId: userId }).subscribe(
      (response) => {
        console.log('Student enrolled successfully', response);
        console.log(response);

        this.getCourseById(courseId).subscribe(
          (course: Course) => {
            this.userServise.currentUser.courses.push(course)
            this.currentCoursesSubject.next(this.userServise.currentUser.courses)
            console.log("current curses__enrool", this.currentCourses$);
            this.currentCourses$.subscribe(courses => {
              console.log(courses);
           });
           console.log("current curses__enrool____________");
           
            console.log("cc", this.userServise.currentUser.courses);
            alert(`${course.title}: נרשמת בהצלחה לקורס `)
          },
          (error) => {
            console.error('Error fetching course details', error);
          }
        )
        // ניתן להוסיף לוגיקה נוספת אם נדרש
      },
      (error) => {
        alert("you are already enrolled in this course")

        console.error('Error enrolling student', error);
      }
    );
  }
  unenrolStudent(courseId: number): void {
    let userId =  this.userServise.currentUser.id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userServise.token}`
    });
    const body = { userId: userId }
 
     this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body}).subscribe(
    (response) => {
      console.log('Student unenrolled successfully', response);
      console.log(response);

      this.getCourseById(courseId).subscribe(
        (course: Course) => {
          this.userServise.currentUser.courses = this.userServise.currentUser.courses.filter(c => c.id !== courseId)
          this.currentCoursesSubject.next(this.userServise.currentUser.courses)
          console.log("current curses__unenroll", this.currentCourses$);
          this.currentCourses$.subscribe(courses => {
            console.log(courses);
         });
         console.log("current curses__unenrool____________");
          console.log("cc", this.userServise.currentUser.courses);
          alert(`${course.title}: יצאת בהצלחה מהקורס `)
        },
        (error) => {
         
          console.error('Error fetching course details', error);
        }
      )
      // ניתן להוסיף לוגיקה נוספת אם נדרש
    },
    (error) => {
      alert("you arent enrolled in this course")
      console.error('Error unenrolling student', error);
    }
  );
  } 
}


