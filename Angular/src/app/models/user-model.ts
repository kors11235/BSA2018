export class User {
	name:string;
	lastname:string;
	private email:string;
  	year:number;
	private password:string;
	  
	constructor(name:string, lastname:string, email:string, year:number, password:string) {
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.year = year;
		this.password = password;
	}

	getEmail() : string {
		return this.email;
	}

	getPassword() : string {
		return this.password;
	}
}