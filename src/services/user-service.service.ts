import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponceSign, User } from '../types/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
users:User[]=[]
currentUser:User={id:-1,name:'',email:'',password:'',role:"user",courses:[]}
token!:string
  constructor(private http:HttpClient) { }
  private apiUrl='http://localhost:3000/api'
  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }
  createUser(user:User):Observable<ResponceSign>
  {

    const res= this.http.post<ResponceSign>(`${this.apiUrl}/auth/register`,user).pipe(
      tap((res:ResponceSign)=>
      {
        this.currentUser=user //  
         this.currentUser.id = res.userId;
         this.token=res.token
         this.currentUser.courses=[]
      }
      )
    )
    return res;
  }
  loginUser(emailPassword:any)
  {
    const res= this.http.post<User>(`${this.apiUrl}/auth/login`,emailPassword).pipe(
      tap((res:any)=>
      {
        this.currentUser.id=res.userId
        this.currentUser.role=res.role
        this.token=res.token
        console.log(this.token);
        console.log(this.currentUser);
      }
      )
    )
    return res;
  }
  updateUser(userId:string,user:User):Observable<User>
  {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`,user)
  }
  deleteUser(userId:string):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`)
  }     
  getUserById():Observable<User>
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const res= this.http.get<User>(`${this.apiUrl}/users/${this.currentUser.id}`, { headers }).pipe(
      tap(
       (res:User) =>
          {
          //  let user:User={
          //     ID:res.ID,
          //     name:res.name,
          //     email:res.email,
          //     password:res.passward,
          //     role:res.role,
          //     courses:res.courses
          //  }
            this.currentUser=res
            console.log("res in get userbyid",res);
            console.log("current in get userbyid",this.currentUser);
          //  this.currentUser.ID=res.ID
            
           
          }
      )
    );
    return res
  }              
}
