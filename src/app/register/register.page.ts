import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { formatDate } from '@angular/common';
import { first } from 'rxjs/operators';


declare var layui;

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }
  return { match: true };
}

function ageRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    const age = ageFromBirthDate(c.value);
    if (age !== undefined && age !== null && (age < min || age > max)) {
      return { range: true };
    }
    return null;
  };
}

function ageFromBirthDate(bd: string) {
  if (bd === undefined || bd === null) {
    return null;
  }
  const today = new Date();
  const birthDate = new Date(bd);
  let age = today.getFullYear() - birthDate.getFullYear();
  const mon = today.getMonth() - birthDate.getMonth();
  if (mon < 0 || (mon === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.OpenMSG();
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
              )
            ])
          ],
          confirmPassword: ['', Validators.required]
        },
        { validator: passwordMatcher }
      ),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ],
      gender: ['', Validators.required],
      birthDate: [
        '',
        Validators.compose([Validators.required, ageRange(15, 65)])
      ],
      country: ['', Validators.required],
      consent: ['', Validators.pattern('true')]
    });
  }

  register(registerForm: FormGroup) {
    console.log(registerForm);
    let layer = layui.layer;
    if (registerForm.valid) {
      this.user = registerForm.value;
      this.user.roles = this.user.username == 'admin' ? "ADMIN" : "USER";
      const newDate = new Date();
      this.user.registerDate = new Date(newDate.getUTCFullYear(),
        newDate.getUTCMonth(),
        newDate.getUTCDate(),
        newDate.getUTCHours(),
        newDate.getUTCMinutes(),
        newDate.getUTCSeconds()
      );
      this.user.password = registerForm.get("passwordGroup").value.password;
      this.user.consent = this.user.consent.toString() == "" ? true : this.user.consent == true ? true : false;
      this.authService.register(this.user).pipe(first())
      .subscribe(
          data => {
              console.log(data);
              layer.msg('Create account successfully!');
              this.router.navigate(['/login']);
          },
          error => {
            layer.msg(error);
          });
    }
  }

}
