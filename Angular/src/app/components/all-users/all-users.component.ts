import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users = JSON.parse(localStorage.getItem('users'));

  constructor(private router:Router) { }

  ngOnInit() {
  }

  viewUser(email) {
    console.log(String(email) == localStorage.getItem('email'));
    if (String(email) == localStorage.getItem('email')) {
      this.router.navigate(['/dashboard/user-profile']);
      return;
    }
    this.router.navigate(['/dashboard/'+email]);
  }

  ascSort(mode) {
    if (mode == 'name')
      this.users.sort((a, b) => {
        return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0);
      });
    
    if (mode == 'lastname')
      this.users.sort((a, b) => {
        return (a.lastname.toLowerCase() > b.lastname.toLowerCase()) ? 1 : ((a.lastname.toLowerCase() < b.lastname.toLowerCase()) ? -1 : 0);
      });
    
    if (mode == 'email')
      this.users.sort((a, b) => {
        return (a.email.toLowerCase() > b.email.toLowerCase()) ? 1 : ((a.email.toLowerCase() < b.email.toLowerCase()) ? -1 : 0);
      });
    
    if (mode == 'year')
      this.users.sort((a, b) => {
        return (Number(a.year) > Number(b.year)) ? 1 : ((Number(a.year) < Number(b.year)) ? -1 : 0);
      });
  }

  descSort(mode) {
    if (mode == 'name')
      this.users.sort((a, b) => {
        return (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0);
      });
    
    if (mode == 'lastname')
      this.users.sort((a, b) => {
        return (a.lastname.toLowerCase() < b.lastname.toLowerCase()) ? 1 : ((a.lastname.toLowerCase() > b.lastname.toLowerCase()) ? -1 : 0);
      });
    
    if (mode == 'email')
      this.users.sort((a, b) => {
        return (a.email.toLowerCase() < b.email.toLowerCase()) ? 1 : ((a.email.toLowerCase() > b.email.toLowerCase()) ? -1 : 0);
      });
    
    if (mode == 'year')
      this.users.sort((a, b) => {
        return (Number(a.year) < Number(b.year)) ? 1 : ((Number(a.year) > Number(b.year)) ? -1 : 0);
      });
  }

  default() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

}
