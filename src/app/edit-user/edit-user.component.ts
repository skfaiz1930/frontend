import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup = this.fb.group({
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
    return this.editForm.get('name');
  }
  get gender(): any {
    return this.editForm.get('gender');
  }
  get email(): any {
    return this.editForm.get('email');
  }
  get number(): any {
    return this.editForm.get('number');
  }
  get employee(): any {
    return this.editForm.get('employee');
  }

  editFormSubmit() {
    const formData = this.editForm.value;
    this.userService.addUser(formData).subscribe(
      (res: any) => {
        this.userService.getUsers();
        this.editForm.reset();
      },
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {}
}
