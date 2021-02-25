import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { State } from './models/state.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentState :State = new State();
  title = 'oin-spa';
  
  updateUserState(state: State) {
    if (!state.authenticated) {
      state.idToken = '';
      sessionStorage.clear();
    }
    this.currentState = state;
    console.log(state)
    // window.location.replace('http://yahoo.com')
  }

  constructor(private http: HttpClient) {
    
    // receive messages from login window
    window.addEventListener("message", (event) => {
      // if (event.origin !== 'http://spa.oktamanor.com:5000') {
      if (event.origin !== 'https://spa.erikdevelopernot.com') {
          console.log('Not Accepting post_message from origin: ' + event.origin);
        return;
      }

      const parcel = JSON.parse(decodeURI(event.data));
      // console.log(JSON.stringify(parcel, null, 2));
      this.currentState.idToken = parcel.idtoken;
      this.currentState.color = parcel.bundle.color.search('/[#]/g') === -1 ? `#${parcel.bundle.color}` : parcel.bundle.color; 
      this.currentState.name = parcel.bundle.name;
      this.currentState.msg = parcel.bundle.msg;
      this.currentState.authenticated = true;
      // sessionStorage.setItem('oinSPA', parcel);
      sessionStorage.setItem('oinSPA', event.data);
      // console.log(this.currentState.color)
    });
  }

  ngOnInit(): void {
    console.log("ON INIT...");
    const oinSpaToken = sessionStorage.getItem('oinSPA');
    if (oinSpaToken) {
      // this.currentState.idToken = oinSpaToken;
      // this.currentState.authenticated = true;
      const parcel = JSON.parse(decodeURI(oinSpaToken));
      this.currentState.idToken = parcel.idtoken;
      this.currentState.color = parcel.bundle.color.search('/[#]/g') === -1 ? `#${parcel.bundle.color}` : parcel.bundle.color; 
      this.currentState.name = parcel.bundle.name;
      this.currentState.msg = parcel.bundle.msg;
      this.currentState.authenticated = true;
    } else {
      this.currentState.authenticated = false;
    }
  }
}
