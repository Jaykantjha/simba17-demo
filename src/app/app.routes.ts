import { Routes } from '@angular/router';
import { VORedirectionLoginComponent } from './core/voredirection-login/voredirection-login.component';
import { Layout1Component } from './shared/layout/layout-1/layout-1.component';

export const routes: Routes = [
    {
        path: 'registration/VORedirectionLogin',
        component: VORedirectionLoginComponent,
    },
    {
        path: 'health',
        children: [
            {
                path: '',
                component: Layout1Component,
                children: [
                    {
                        path: ':productName/getstarted',
                        loadComponent: () => import('./core/health/started/started.component')
                            .then(c => c.StartedComponent)
                    },
                    {
                        path: 'cover',
                        loadComponent: () => import('./core/health/cover/cover.component')
                            .then(c => c.CoverComponent)
                    },
                ]
            },
            {
                path: '',
                children: [
                    {
                        path: ':productName/layout1',
                        loadComponent: () => import('./core/health/started/started.component')
                            .then(c => c.StartedComponent)
                    },
                    {
                        path: 'cover',
                        loadComponent: () => import('./core/health/cover/cover.component')
                            .then(c => c.CoverComponent)
                    },
                ]
            }
        ]
    }
];
