import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showLoginForm: boolean = false;
  constructor() { }

  @Input('backgroundcolor') backgroundcolor: String = '#66ff99';
  toggle() {
    this.showLoginForm = !this.showLoginForm;
  }
}