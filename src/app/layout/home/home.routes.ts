import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'group-operation',
                component: GroupDetailComponent,
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch : 'full'
            }
        ],
    },
];