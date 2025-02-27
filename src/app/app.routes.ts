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
            },
            {
                path: 'recuperar-usuario',
                loadComponent: () => import('./components/manage-user/components/recovery-user/recovery-user.component').then(mod => mod.RecoveryUserComponent),
            },
            {
                path: 'registrar-usuario',
                loadComponent: () => import('./components/manage-user/components/registry-user/registry-user.component').then(mod => mod.RegistryUserComponent),
            }
            
        ]
    }
];
