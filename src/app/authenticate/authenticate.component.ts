import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthType } from '../models/authType.model';
import { State } from './../models/state.model';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {//implements OnInit {
  domainError: boolean;

private SPA_URL: string = 'https://spa.erikdevelopernot.com';
// private SPA_URL: string = 'http://spa.oktamanor.com:5000';
  
  authTypes: AuthType[] = [
    new AuthType("App Redirect", "http://spa.oktamanor.com")
  ]

  @Input() state!: State;
  @Output() changeState = new EventEmitter<State>();

  constructor(private http: HttpClient) { 
    this.domainError = false;
  }

  ngOnInit(): void {
    
  }

  logout() {
    if (this.state.authenticated) {
      this.http.delete(this.SPA_URL + '/spa', { withCredentials: true })
        .subscribe(
          (response) => {
            // console.log(response);
          },
          (error) => {
            console.log(error);
          }
        )
    } 
    
    this.state.authenticated = false;
    this.state.idToken = '';
    this.state.color = '#FFFFFF';
    this.state.msg = '';
    this.state.name = '';
    this.changeState.emit(this.state);
  }

  checkEmailDomain(email: string) {
    if (!email || email === '') {
      return;
    }
    this.domainError = false;
    console.log(email);
    this.http.head(this.SPA_URL + '/checkdomain?email=' + email)
      .subscribe(
        (response) => {
          var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=no,width=570px,height=720px";
          window.open(this.SPA_URL + '/spa?email=' + email, '_blank', windowFeatures);
          
        },
        (error) => {
          // console.log(error);
          this.domainError = true;
        },
        () => {
          // complete handler
          // console.log("GET complete");
        }
      )
  }
}
