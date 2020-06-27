import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['../user-profile/user-profile.component.css', './view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  url = String(this.router.url).split('/');
  email = this.url[this.url.length-1];

  users = JSON.parse(localStorage.getItem('users'));
  name = this.users.find(el => el.email == this.email).name;
  lastname = this.users.find(el => el.email == this.email).lastname;
  year = this.users.find(el => el.email == this.email).year;

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
