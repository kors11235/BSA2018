import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-password',
  templateUrl: './show-password.component.html',
  styleUrls: ['./show-password.component.css']
})
export class ShowPasswordComponent implements OnInit {
  users = JSON.parse(localStorage.getItem('users'));
  email = (<HTMLInputElement>document.getElementById('emailCheck')).value;
  password = this.users.find(el => el.email == this.email).password;;

  constructor() { }

  ngOnInit() {
  }

}
