import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './service/course.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CoursesListComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CourseService],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule { }