import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GROUP_LISTING } from '../shared/data-constants/group-arrays';
import { User } from '../core/interfaces/group';
import { ToastrService } from 'ngx-toastr';
import { USER_LIST } from '../shared/data-constants/user-array';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm : FormGroup;
  isFieldValid = signal<boolean>(true);
  passwordFieldType = signal<boolean>(true);
  userList : User[] = [];

  constructor(private formBuilder: FormBuilder, private router : Router, private toastr : ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() : void{
    let list = localStorage.getItem('USER_LIST');
    this.userList = list ? JSON.parse(list) : [];
    if( this.userList.length === 0){
      localStorage.setItem('USER_LIST', JSON.stringify(USER_LIST))
    }
  }

  get formCtrl() { return this.loginForm.controls };

  onSubmit() : void {
    if(this.loginForm.invalid){
      this.isFieldValid.set(false);
      return;
    }
    let idx = this.userList.find((data) => data.user_name === this.loginForm.get('email')?.value);
    if(idx){
      this.toastr.success('Success', 'Login Successful');
      localStorage.setItem('token', JSON.stringify(idx));
      localStorage.setItem('GROUP_LIST', JSON.stringify(GROUP_LISTING));
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('Failed', 'Something Went Wrong');
    }
  }

}
