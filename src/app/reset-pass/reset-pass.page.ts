import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';


declare var layui;
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  ResetPass: FormGroup;

  data: any;
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ResetPass = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ]
    });
  }

  ResetPWD(ResetPass: FormGroup){
    this.data = {...ResetPass.value}
    let layer = layui.layer;
    this.authservice.ResetPWD(this.data).pipe(first())
    .subscribe(
        data => {
            if(data.msg == "1"){
              layer.msg('Resset password successfully!');
              this.router.navigate(['/login']);
            }
            if(data.msg == "2"){
              layer.msg('Reset password!');
              this.router.navigate(['/login']);
            }
            if(data.msg == "0"){
              layer.msg('Have problem with sending email!');
              this.router.navigate(['/login']);
            }
        },
        error => {
          if(error.status == '401'){
            layer.msg('You have no authorized.');
          }
        });
  }
}
