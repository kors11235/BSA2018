import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name = localStorage.getItem('name');
  isLogin = this.user.getUserLoggedIn();
  
  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  }

  showAllUsers() : void {
    this.router.navigate(['dashboard/all-users']);
  }

  logOut() : void {
    localStorage.removeItem('email');
    this.user.setUserLoggedOut();
  }

}
