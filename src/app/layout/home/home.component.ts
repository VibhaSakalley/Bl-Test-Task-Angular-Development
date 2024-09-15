import { Component } from '@angular/core';
import { GROUP_LISTING } from '../../shared/data-constants/group-arrays';
import { RouterModule } from '@angular/router';
import { Group } from '../../core/interfaces/group';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  groupDetails : Group[] = [];

  constructor(){}

  ngOnInit() : void{
    let list = localStorage.getItem('GROUP_LIST');
    this.groupDetails = list ? JSON.parse(list) : [];
  }
}
