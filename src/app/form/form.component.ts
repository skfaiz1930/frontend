import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.minLength(10)]],
    employee: ['', [Validators.required]],
  });

  genderList: string[] = ['Trans', 'Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    public userService: UserServicesService
  ) {}

  get name(): any {
    return this.registerForm.get('name');
  }
  get gender(): any {
    return this.registerForm.get('gender');
  }
  get email(): any {
    return this.registerForm.get('email');
  }
  get number(): any {
    return this.registerForm.get('number');
  }
  get employee(): any {
    return this.registerForm.get('employee');
  }

  registerFormSubmit() {
    const formData = this.registerForm.value;
    this.userService.addUser(formData).subscribe(
      (res: any) => {
        this.userService.getUsers();
        this.registerForm.reset();
      },
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {}
}
