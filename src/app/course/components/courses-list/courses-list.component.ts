import { CourseQuery } from './../../store/course.query';
import { CourseService } from './../../service/course.service';
import { CourseState } from './../../store/course.store';
import { tap, switchMap, filter } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from './../../model/course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courseToBeUpdated: Course| null = null;

  isUpdateActivated = false;

  listCoursesSub: Subscription| null = null;

  deleteCourseSub: Subscription| null = null;

  updateCourseSub: Subscription| null = null;

  cstate: CourseState| null = null;

  courses$: Observable<Course[]> | undefined = this.courseQuery.selectAll();

  UpdateForm: FormGroup;

  constructor(private courseService: CourseService, private courseQuery: CourseQuery) {
    this.UpdateForm = new FormGroup({

      name: new FormControl( '',[Validators.required]),
      description: new FormControl( '',[Validators.required]),
      
    })

  }

  ngOnInit() {
    this.listCoursesSub = this.courseQuery.selectAreCoursesLoaded$.pipe(
      filter(areCoursesLoaded => !areCoursesLoaded),
      switchMap<boolean, Observable<Course[]> >(areCoursesLoaded => { 
          return this.courseService.getAllCourses();
      })
    ).subscribe(result => {});
  }

  deleteCourse(courseId: string) {
    this.deleteCourseSub = this.courseService.deleteCourse(courseId).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse() {
    if(this.courseToBeUpdated)
      this.updateCourseSub = this.courseService.updateCourse(
        this.courseToBeUpdated.id, this.UpdateForm.value).subscribe(result => console.log(result)
      );
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

  ngOnDestroy() {
    if (this.listCoursesSub) {
      this.listCoursesSub.unsubscribe();
    }

    if (this.deleteCourseSub) {
      this.deleteCourseSub.unsubscribe();
    }

    if (this.updateCourseSub) {
      this.updateCourseSub.unsubscribe();
    }
  }

}
