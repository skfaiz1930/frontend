import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any[] = [];
  constructor(private userService: UserServicesService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.userService.getUsers();
    console.log(this.user);
  }
  ngDoCheck() {
    this.user = this.userService.user;
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }
}
