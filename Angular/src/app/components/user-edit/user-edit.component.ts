import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { validateEmail } from './validate-email';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  name = localStorage.getItem('name');
  lastname = localStorage.getItem('lastname');
  year = Number(localStorage.getItem('year'));
  email = localStorage.getItem('email');
  password = JSON.parse(localStorage.getItem('users')).find(el => el.email == this.email).password;
  emailValidation() : boolean {
    return validateEmail(this.email, (<HTMLInputElement>document.getElementById('userEmail')).value);
  }

  constructor(private user: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  saveChanges(evt) {
    evt.preventDefault();
    console.log(this.password);
    let nameEl = (<HTMLInputElement>document.getElementById('userName')),
        lastnameEl = (<HTMLInputElement>document.getElementById('userLastname')),
        emailEl = (<HTMLInputElement>document.getElementById('userEmail')),
        yearEl = (<HTMLInputElement>document.getElementById('userYear')),
        passwordEl = (<HTMLInputElement>document.getElementById('userPassword'));
    
    // Validate changed data
    let errors = document.getElementsByClassName('errorMessage');
    if (errors[0]) return;
    else evt.target.reset();
      
    let name = (nameEl == null || nameEl.value.length == 0) ? this.name : nameEl.value;
    let lastname = (lastnameEl == null || lastnameEl.value.length == 0) ? this.lastname : lastnameEl.value;
    let year = (yearEl == null || yearEl.value.length == 0) ? this.year : yearEl.value;
    let email = (emailEl == null || emailEl.value.length == 0) ? this.email : emailEl.value;
    let password = (passwordEl == null || passwordEl.value.length == 0) ? this.password : passwordEl.value;

    // Save data to local storage
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.find(el => el.email == this.email);
    user.name = name; user.lastname = lastname; user.email = email; user.year = year; user.password = password;
    localStorage.setItem('users', JSON.stringify(users));
    
    localStorage.setItem('name', name);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('email', email);
    localStorage.setItem('year', String(year));

    this.router.navigate(['dashboard/user-profile']);
  }

}
