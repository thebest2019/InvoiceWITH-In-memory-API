import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

declare var layui;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  currentUser: any;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(loginForm: FormGroup) {
    let layer = layui.layer;
    const user = { ...loginForm.value }; // Object.assign({}, this.user, loginForm.value);
    this.authservice.login(user.username, user.password).pipe(first())
    .subscribe(
        data => {
            console.log(data);
            layer.msg('Login successfully!');
            this.router.navigate(['/taps']);
        },
        error => {
          if(error.status == '401'){
            layer.msg('Username or Password is incorrectly.');
          }
          
        });
  }





}
