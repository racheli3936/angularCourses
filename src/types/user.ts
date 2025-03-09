export type User={
id:number,
name:string,
email:string,
password:string,
role:Role
courses:Course[]
}
export type Role="user"|"teacher"|"admin";
export type ResponceSign={
    message:string,
    userId:number,
    token:string
}
export type Course={
    id:number,
    title:string,
    description:string,
    teacherId:number,
    lessons:Lesson[]
}
export type Lesson={
    lessonId:number,
    title:string,
    content:string,
    courseId:number
}