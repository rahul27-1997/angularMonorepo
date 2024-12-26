import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule,  ReactiveFormsModule,
    FormlyBootstrapModule,FormlyModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  loginService = inject(LoginService);
  form: FormGroup = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First Name',
        placeholder: 'Enter First Name',
        required: true,
      },
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        required: true,
      },
    },
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
      },
      validation: {
        messages: {
          pattern: () => `Please enter a valid Email Id`,
        },
      }
    }
  ];

  submit() {
    if (this.form.valid) {
      this.loginService.login();
      this.router.navigate(['/home']);
    }
  }
}
