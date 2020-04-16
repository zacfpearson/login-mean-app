export class User {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    _id?: string;
  
    constructor(email: string, password: string, firstName?: string, lastName?: string,  userID?: string){
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this._id = userID;
    }
  }