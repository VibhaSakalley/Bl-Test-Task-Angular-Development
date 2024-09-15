import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group, State } from '../../../core/interfaces/group';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent {

  stateData! : State;
  groupForm : FormGroup;
  isFieldValid = signal<boolean>(true);
  groupList : Group[] = [];

  constructor(private formBuilder: FormBuilder, private router : Router,private toastr : ToastrService) {
  
    let state = router.getCurrentNavigation()?.extras.state;
    if(state){
    this.stateData = state;
    } else {
      this.router.navigate(['/404']);
    }
    this.groupForm = this.formBuilder.group({
      groupName : ['', [Validators.required, Validators.minLength(2)]],
      totalCost : ['', [Validators.required]],
      groupDescription : ['', [Validators.required, Validators.maxLength(150)]],
      costManagement : [{value: '', disabled: this.stateData['action'] === 'view'}, [Validators.required]],
      settledCost : ['']
    });
  }

  get formCtrl() { return this.groupForm.controls }

  ngOnInit() : void{
    let list = localStorage.getItem('GROUP_LIST');
    this.groupList = list ? JSON.parse(list) : [];

    if(this.stateData['action'] !== 'add'){
      let searchGroup = this.groupList?.find((data) => data.groupName === this.stateData['name']);
      if(searchGroup){
        this.groupForm.patchValue({
          groupName : searchGroup.groupName,
          totalCost : searchGroup.totalCost,
          groupDescription : searchGroup.groupDescription,
          costManagement : searchGroup.costManagement,
          settledCost: searchGroup.settledCost
        });
      }
    }
  }

  onSubmit() : void {
    if(this.groupForm.invalid){
      this.isFieldValid.set(false);
      return;
    }
    if(this.stateData['action'] === 'edit'){
      let foundIdx = this.groupList?.findIndex((data) => data.groupName === this.stateData['name']);
      if(foundIdx !== -1){
        this.groupList[foundIdx]['groupName'] = this.groupForm.get('groupName')?.value;
        this.groupList[foundIdx]['totalCost'] = this.groupForm.get('totalCost')?.value;
        this.groupList[foundIdx]['groupDescription'] = this.groupForm.get('groupDescription')?.value;
        this.groupList[foundIdx]['costManagement'] = this.groupForm.get('costManagement')?.value;
        this.groupList[foundIdx]['settledCost'] = this.groupForm.get('settledCost')?.value;
      }
    } else {
      this.groupList.push(this.groupForm.value);
    }
    localStorage.setItem('GROUP_LIST', JSON.stringify(this.groupList));
    this.toastr.success('Success', 'Operation Successfull');
  }

  sendMail(){}

}
