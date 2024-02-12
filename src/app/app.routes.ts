import { Routes } from '@angular/router';
import { VORedirectionLoginComponent } from './core/voredirection-login/voredirection-login.component';

export const routes: Routes = [
    {
        path: 'registration/VORedirectionLogin',
        component: VORedirectionLoginComponent,
    },
    {
        path: 'health',
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
    }
];
