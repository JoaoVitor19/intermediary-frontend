import { Component } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CourseService } from '../course.service';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  course: any = {};
  form = new FormGroup({});
  model: any = {};

  fields: FormlyFieldConfig[] = [
    {
      className: 'd-flex align-content-center justify-content-center',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Nome do Curso',
            placeholder: 'Nome do Curso',
            required: true,
          },
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {


    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id !== undefined && params.id !== null) {
        this.course = await this.courseService.get<any>({
          url: `http://localhost:3000/course/${params.id}`,
          params: {

          }
        });
        this.model = this.course;
      } else {
        this.model = {}
      }

    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      if (this.model?.id !== undefined && this.model?.id !== null) {
        this.course = await this.courseService.put<any>({
          url: `http://localhost:3000/updateCourse/${this.model?.id}`,
          params: {

          },
          data: this.model
        });

      } else {
        delete this.model?.id;
        await this.courseService.post<any>({
          url: `http://localhost:3000/addCourse`,
          params: {

          },
          data: this.model
        })
      }

    }
    await this.router.navigate(['/courses']);
  }
}

