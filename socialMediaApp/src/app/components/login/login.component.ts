import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginValidators } from '../../validators/loginValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  checkoutFormGroup!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      credentials: this.formBuilder.group({
        username: new FormControl('',
          [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          LoginValidators.notOnlyWhitespace]),
        password: new FormControl('',
          [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          LoginValidators.notOnlyWhitespace])
      })
    })
  }

  get username() { return this.checkoutFormGroup.get('credentials.username'); }
  get password() { return this.checkoutFormGroup.get('credentials.password'); }


  login() {
    this.loading = true;
  }


}
