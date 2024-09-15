import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmedValidator } from '../shared/common-files/confirm.validator';
import { PASSWORD_VALIDATION } from '../shared/common-files/common-regex';
import { USER_LIST } from '../shared/data-constants/user-array';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule, FormsModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  registerForm : FormGroup;
  isFieldValid = signal<boolean>(true);
  userList = USER_LIST;

  constructor(private formBuilder: FormBuilder, private router : Router,private toastr : ToastrService) {

    this.registerForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.pattern(PASSWORD_VALIDATION), Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator
    } as AbstractControlOptions)
  }

  get formCtrl() { return this.registerForm.controls }

  onSubmit() {
    if(this.registerForm.invalid){
      this.isFieldValid.set(false);
      return;
    }
    const roles = ["Admin", "Group Leader", "User"];
    const random = Math.floor(Math.random() * roles.length);
    this.registerForm.removeControl('confirm_password');
    this.userList.push({...this.registerForm.value, user_role : roles[random]})
    localStorage.setItem('USER_LIST', JSON.stringify(this.userList));
    this.toastr.success('Success', 'Registration Successfull');
    this.router.navigate(['/login']);
  }

}
