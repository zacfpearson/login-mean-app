import { Component, OnInit } from '@angular/core';
import {DatasService} from '../services/web.service';
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatasService]
})
export class HomeComponent implements OnInit {

  email: string = null;
  password: string = null;
  firstName: string = null;
  lastName: string = null;
  isNewUser: Boolean = true;
  signInError: Boolean = false;
  signUpError: Boolean = false;

  constructor(private dataService: DatasService, private router: Router) { }

  loggedIn(){
    return this.dataService.isLoggedIn();
  }

  reset(){
    this.email = null;
    this.password = null;
    this.firstName = null;
    this.lastName = null;
  }

  newUser(){
    this.isNewUser = !this.isNewUser;
  }

  onSignupSubmit() {
    const user = new User(
      this.email,
      this.password,
      this.firstName,
      this.lastName
    );
    this.dataService.addUser(user)
        .subscribe(
          data => {
            this.newUser();
            this.reset();
            this.signUpError = false;
          },
          error => {
            this.signUpError = true;
          }
        );
      
  }

  onSigninSubmit() {
      const user = new User(
        this.email,
        this.password
      );
      this.dataService.signIn(user)
          .subscribe(
            data => {
              localStorage.setItem('token',data.token);
              localStorage.setItem('userId',data.userId);
              this.signInError = false;
              this.reset();
            },
            error => {
              this.signInError = true;
            });
  }

  onLogout() {
    this.dataService.logout();
  }

  deleteUserByEmail(){
    this.dataService.deleteUser(localStorage.getItem('userId')).subscribe(
      data => {
        this.onLogout();
        this.reset();
      }
    );
  }

  ngOnInit(): void {
  }

}
