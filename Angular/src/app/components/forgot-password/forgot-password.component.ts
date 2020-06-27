import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  num1:number;
  num2:number;

  constructor(private router:Router, private user:UserService) {
    // Generate random numbers
    this.num1 = Math.floor(Math.random() * 101);
    this.num2 = Math.floor(Math.random() * 101);
  }

  ngOnInit() {
  }
  
  // If user is robot redirect him back
  checkRobot(evt) : boolean {
    if (Number((<HTMLInputElement>document.getElementById('robotCheck')).value) == this.num1 + this.num2) {
      this.checkEmail(evt, (<HTMLInputElement>document.getElementById('emailCheck')).value);
    }
    else this.router.navigate(['']);
    return false;
  }

  // Looks for email entered
  checkEmail(evt, email:string) : boolean {
    let arr = JSON.parse(localStorage.getItem('users'));
    let el = (<HTMLInputElement>document.getElementById('emailCheck'));
    let label = el.parentElement.getElementsByTagName('label')[0];

    if (arr.find(e => e.email == email)) {
      label.innerText = 'Email';
      label.className = '';
      document.getElementById('showPasswordBtn').style.display = 'none';
      
      this.user.setPermForPassword();
      this.router.navigate(['forgot-password/show-password']);
    }
    else {
      label.innerText = 'This email isnt registered';
      label.className += 'errorMessage';
    }
    return false;
  }

}
