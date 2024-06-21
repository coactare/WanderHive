import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
    {
        path: 'manage-catalog',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/catalog/catalog.routes').then((m) => m.manageCatalogRoutes),
    },
    {
        path: 'add-catalog-item',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/catalog/catalog.routes').then((m) => m.addCatalogRoutes),
    },
    {
        path: 'edit-catalog-item/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/catalog/catalog.routes').then((m) => m.editCatalogRoutes),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
    },
    {
        path: 'login',
        loadChildren: () => import('../app/account/account.routes').then((m) => m.loginRoutes)
    },
    {
        path: 'register',
        loadChildren: () => import('../app/account/account.routes').then((m) => m.registerRoutes),
    },
    {
        path: 'signin-callback',
        loadChildren: () => import('../app/account/account.routes').then((m) => m.signInCallbackRoutes),
    },
    {
        path: 'signout-callback',
        loadChildren: () => import('../app/account/account.routes').then((m) => m.signOutCallbackRoutes),
    }

];
