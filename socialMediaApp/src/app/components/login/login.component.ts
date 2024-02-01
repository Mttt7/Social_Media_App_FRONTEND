import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginValidators } from '../../validators/loginValidators';
import { AuthService } from '../../services/auth.service';
import { LoginResponsePayload } from '../../models/LoginResponsePayload';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  credentialsFormGroup!: FormGroup;
  invalidCredentials: boolean = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.credentialsFormGroup = this.formBuilder.group({
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

  get username() { return this.credentialsFormGroup.get('credentials.username'); }
  get password() { return this.credentialsFormGroup.get('credentials.password'); }


  login() {
    this.loading = true;
    this.authService.login(this.credentialsFormGroup.get('credentials')?.value).subscribe(
      data => {
        this.authService.setToken(data);
        this.loading = false;
        this.userService.getUserId().subscribe(
          data => {
            localStorage.setItem('userId', data.toString());
            this.router.navigateByUrl('/home');
          }
        )

      }, error => {
        this.loading = false;
        if (error.status == 401) {
          this.invalidCredentials = true;
        }
      }
    )
  }




}
