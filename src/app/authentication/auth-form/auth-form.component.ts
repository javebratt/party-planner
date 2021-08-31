import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserCredential } from '../authentication.model';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() actionButtonText = 'Sign In';
  @Input() isPasswordResetPage = false;
  @Output() formSubmitted = new EventEmitter<any>();
  public authForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm(!this.isPasswordResetPage);
  }

  initializeForm(showPasswordField: boolean): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([showPasswordField ? Validators.required : null, Validators.minLength(6)])],
    });
  }

  submitCredentials(authForm: FormGroup): void {
    if (!authForm.valid) {
      console.log('Form is not valid yet, current value:', authForm.value);
    } else {
      const credentials: UserCredential = {
        email: authForm.value.email,
        password: authForm.value.password,
      };
      this.formSubmitted.emit(credentials);
    }
  }
}
