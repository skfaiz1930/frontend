import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  editForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.minLength(10)]],
    employee: ['', [Validators.required]],
    _id: [''],
  });

  genderList: string[] = ['Trans', 'Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    public userService: UserServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //get id from the params

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
    this.userService.editUser(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.userService.getUsers();
        this.editForm.reset();
        this.router.navigate(['/']);
      },
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId != null) {
      this.userService.getUser(this.userId).subscribe((res: any) => {
        this.editForm.setValue({
          _id: res.users._id,
          name: res.users.name,
          email: res.users.email,
          number: res.users.number,
          employee: res.users.employee,
          gender: res.users.gender,
        });
      });
    }
  }

  // save the updated user
}
