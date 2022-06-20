import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserServicesService {
  user: any[] = [];
  userId: string = '';
  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post(`${this.serverUrl}/register`, data);
  }

  getUsers() {
    return this.http.get(`${this.serverUrl}/get-users`).subscribe(
      (res: any) => {
        this.user = res.users;
      },
      (err: any) => console.log(err)
    );
  }

  editUser(data: any) {
    this.userId = data._id;
    return this.http.put(`${this.serverUrl}/edit/${data._id}`, data).subscribe(
      (res) => {
        console.log(res);
        this.getUsers();
      },
      (err) => console.log(err)
    );
  }

  deleteUser = (id: string) => {
    this.http.delete(`${this.serverUrl}/delete/${id}`).subscribe(
      (res) => {
        console.log(res);
        this.getUsers();
      },
      (err) => console.log(err)
    );
  };
}
