import { CourseStore, CourseState } from './../store/course.store';
import { EntityStore, EntityState } from '@datorama/akita';
import { Course } from './../model/course.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class CourseService {

  http: HttpClient;

  store: CourseStore;

  url:string;

  constructor(http: HttpClient, store: CourseStore) {
    this.http = http;
    this.store = store;
    this.url = environment.server;
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url+'/api/courses').pipe(
      tap(courses => {
        this.store.loadCourses(courses, true);
      })
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url+'/api/courses', course).pipe(
      tap(value => {
        console.log(value)
        this.store.add([value]);
      })
    );
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(this.url+'/api/courses/' + courseId).pipe(
      tap(result => {
        this.store.remove(courseId);
      })
    );
  }

  updateCourse(courseId: string, course: Course): Observable<any> {
    return this.http.put(this.url+'/api/courses/' + courseId, course).pipe(
      tap(result => {
        this.store.update(courseId, course);
      })
    );
  }
}