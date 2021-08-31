import { Subscription } from 'rxjs';
import { CourseService } from './../../service/course.service';
import { CourseStore } from './../../store/course.store';
import { Course } from './../../model/course.model';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 } from 'uuid';
import { Router } from '@angular/router';
@Component({
    selector: 'app-create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

    createCourseSub: Subscription | null = null;

    createForm: FormGroup;

    constructor(private store: CourseStore, private courseService: CourseService, private router: Router) {
        this.createForm = new FormGroup({

            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),

        })
    }

    ngOnInit() {
    }

    onSubmit() {

        console.log(this.createForm.value);

        if (this.createForm.invalid) {
            return;
        }

        const course: Course = { id: "", name: this.createForm.value.name, description: this.createForm.value.description };
        this.createCourseSub = this.courseService.createCourse(course).subscribe(result => {
            this.router.navigateByUrl('/courses');
        });
    }
}
