import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/manage-user/manage-user.component').then(mod => mod.ManageUserComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./components/manage-user/components/login/login.component').then(mod => mod.LoginComponent),
            },
            {
                path: 'recuperar-clave',
                loadComponent: () => import('./components/manage-user/components/recovery-password/recovery-password.component').then(mod => mod.RecoveryPasswordComponent),
            }
            
        ]
    }
];
