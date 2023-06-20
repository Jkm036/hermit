import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

/** 
 * The component for the popup modal that displays the login/register form
 */
export class ModalComponent {
  title = 'bootstrap login';
  loginForm!: FormGroup;
  register = false
  showLoginForm = false;
  @Input() action = 'Register';

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
  @Input('backgroundcolor') backgroundcolor: String = '#66ff99';
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
    })
  }
  get emailField(): any {
    return this.loginForm.get('email');
  }
  get passwordField(): any {
    return this.loginForm.get('password');
  }
  get usernameField(): any {
    return this.loginForm.get('username')
  }
  get firstField() {
    return this.loginForm.get('first')
  }
  get lastField() {
    return this.loginForm.get('last')
  }
  loginFormSubmit(): void {
    console.log(this.loginForm.value);
  }
  onClickClose() {
    this.closeModal.emit();
  }

  openRegister() {
    this.action = this.action === 'Register' ? 'Back' : 'Register'
    this.register = !this.register;
  }
}
