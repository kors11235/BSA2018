import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user-model';
import { validateEmail, checkEmpty} from './validation';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  user = this.User;

  constructor(private router:Router, private User:UserService) {
  }

  ngOnInit() {
  }

  // Calls while email validating
  // Check if email hs already existed
  emailValidation() : boolean {
    return validateEmail((<HTMLInputElement>document.getElementById('regEmail')).value);
  }

  registerUser (evt) : boolean {
    evt.preventDefault();
    let inputs = evt.target.getElementsByTagName('input');

    let name = inputs[0].value,
        lastname = inputs[1].value,
        email = inputs[2].value,
        year = inputs[3].value,
        password = inputs[4].value;

    // Validate & highlight errors
    if (checkEmpty(document.getElementById('registerForm'))) return;

    let errors = document.getElementsByClassName('errorMessage');
    if (errors[0]) return;
    else evt.target.reset();

    //------------------------------------------------------//
   
    // Save user in local storage
    if (!localStorage.getItem('users'))
      localStorage.setItem('users', JSON.stringify([]));
    
    let arr = JSON.parse(localStorage.getItem('users'));
    arr.push(new User(name, lastname, email, Number(year), password));
    localStorage.setItem('users', JSON.stringify(arr));
    
    this.router.navigate(['']);

    return false;
  }

}

