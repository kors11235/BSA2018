import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  name:string;
	lastname:string;
	private email:string;
  year:number;
  private password:string;
  private permForPassword:boolean;

  private isUserLoggedIn:boolean;

  constructor() {
    this.isUserLoggedIn = false;
    this.permForPassword = false;
  }
  
  setUserLoggedIn() : void {
    this.isUserLoggedIn = true;
  }

  setUserLoggedOut() : void {
    this.isUserLoggedIn = false;
  }

  getUserLoggedIn() : boolean {
    return this.isUserLoggedIn;
  }

  getEmail() : string {
		return this.email;
  }

  getPassword() : string {
		return this.password;
  }
  
  setEmail(email:string) : void {
		this.email = email;
  }
  
  getPermForPassword() : boolean {
    return this.permForPassword;
  }

  setPermForPassword() : void {
    this.permForPassword = true;
  }
}
