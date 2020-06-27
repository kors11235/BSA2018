import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router:Router, private user:UserService) {}

  ngOnInit() {
  }

  loginUser(evt) : boolean {
    evt.preventDefault();
    let email = evt.target.elements[0].value;
    let password = evt.target.elements[1].value;
    
    if (localStorage.getItem('users') == null) return;
    let usersJson = JSON.parse(localStorage.getItem('users'));

    let passwordLabel = evt.target.elements[1].parentElement.getElementsByTagName('label')[0],
        emailLabel = evt.target.elements[0].parentElement.getElementsByTagName('label')[0];
    
    let loggedUser = usersJson.find(el => el.email == email);
    if (loggedUser) {
      emailLabel.className = '';
      emailLabel.innerHTML = 'Email';
      
      if (loggedUser.password == password) {
        passwordLabel.className = '';
        passwordLabel.innerHTML = 'Password';

        this.user.setUserLoggedIn();

        localStorage.setItem('name', loggedUser.name);
        localStorage.setItem('lastname', loggedUser.lastname);
        localStorage.setItem('email', loggedUser.email);
        localStorage.setItem('year', String(loggedUser.year));

        this.router.navigate(['dashboard/user-profile']);
      }
      else {
		    passwordLabel.className += 'errorMessage';
        passwordLabel.innerHTML = 'Wrong password';
        return;
      }
    }
    else {
		  emailLabel.className += 'errorMessage';
      emailLabel.innerHTML = 'This email wasnt registered';
      return;
    }

    return false;
  }

  forgotPassword() : void {
    this.router.navigate(['forgot-password']);
  }

}
