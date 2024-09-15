import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path : 'login', component : LoginComponent},
    { path : 'register', component : SignUpComponent},
    { path: 'home', loadChildren: () => import('./layout/home/home.routes').then(m => m.HOME_ROUTES), canActivate: [authGuard] },
    { path: '', redirectTo : 'home', pathMatch : 'full' },
    { path: '404', component : PageNotFoundComponent },
    { path: '**', redirectTo : '404', pathMatch : 'full' }
];
