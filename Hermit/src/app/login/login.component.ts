import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * This component is responsible for showign the login/register form on the page.
 */
export class LoginComponent {

  showLoginForm: boolean = false;
  constructor() { }

  @Input('backgroundcolor') backgroundcolor: String = '#66ff99';

  /**
   * Toggle to show/hide the component
   */
  toggle() {
    this.showLoginForm = !this.showLoginForm;
  }
}