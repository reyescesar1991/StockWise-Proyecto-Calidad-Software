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
    },
    {
        path: 'dashBoard',
        loadComponent: () => import('./components/dash-board-user/dash-board-user.component').then(mod => mod.DashBoardUserComponent),
        children: [

            {
                path: 'productos',
                loadComponent: () => import('./components/products/products.component').then(mod => mod.ProductosComponent),
                children: [

                    {
                        path: 'registrar-producto',
                        loadComponent: () => import('./components/products/components/product-registry/product-registry.component').then(mod => mod.ProductRegistryComponent),
                    },
                    {
                        path: 'modificar-producto',
                        loadComponent: () => import('./components/products/components/modify-product/modify-product.component').then(mod => mod.ModifyProductComponent),
                    },
                    {
                        path: 'lista-productos',
                        loadComponent: () => import('./components/products/components/list-products/list-products.component').then(mod => mod.ListProductsComponent),
                    },
                    {
                        path: 'buscar-producto',
                        loadComponent: () => import('./components/products/components/search-product/search-product.component').then(mod => mod.SearchProductComponent),
                    }
                ]
            },
            {
                path: 'inventario',
                loadComponent: () => import('./components/stock/stock.component').then(mod => mod.StockComponent),
                children: [

                    {
                        path: 'agregar-inventario',
                        loadComponent: () => import('./components/stock/components/add-stock/add-stock.component').then(mod => mod.AddStockComponent),
                    }
                ]
            }
        ]
    }
];
