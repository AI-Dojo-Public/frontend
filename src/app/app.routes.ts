import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cryton',
        loadComponent: () => import('./cryton/cryton.component').then(m => m.CrytonComponent),
        title: 'Cryton',
    },
    {
        path: 'kibana',
        loadComponent: () => import('./kibana/kibana.component').then(m => m.KibanaComponent),
        title: 'Kibana'
    },
    {
        path: 'textual-agents',
        loadComponent: () => import('./textual-agents/textual-agents.component').then(m => m.TextualAgentsComponent),
        title: 'Textual NetSecGameAgents'
    },
    {
        path: 'configuration',
        loadComponent: () => import('./configuration/configuration.component').then(m => m.ConfigurationComponent),
        title: 'Configuration',
        children: [
            {
                path: 'scenarios',
                loadComponent: () => import('./scenarios/scenarios.component').then(m => m.ScenariosComponent),
                title: 'Scenarios'
            },
            {
                path: 'agents',
                loadComponent: () => import('./conf-agents/conf-agents.component').then(m => m.ConfAgentsComponent),
                title: 'Agents'
            },
            {
                path: 'general',
                loadComponent: () => import('./general/general.component').then(m => m.GeneralComponent),
                title: 'General'
            },
            {
              path: 'environments',
              loadComponent: () => import('./environments/environments.component').then(m => m.EnvironmentsComponent),
              title: 'Environments'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/kibana',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/kibana'
    },
];
