import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopersComponent } from './developers/developers.component';
import { IssuesComponent } from './issues/issues.component';
import { PlanComponent } from './plan/plan.component';
import { PrioritiesComponent } from './priorities/priorities.component';
import { StatusesComponent } from './statuses/statuses.component';
import { TypesComponent } from './types/types.component';

const routes: Routes = [
    {
        path: 'plan',
        component: PlanComponent,
        data: {
            state: 'plan',
        },
    },
    {
        path: 'types',
        component: TypesComponent,
        data: {
            state: 'types',
        },
    },
    {
        path: 'statuses',
        component: StatusesComponent,
        data: {
            state: 'statuses',
        },
    },
    {
        path: 'priorities',
        component: PrioritiesComponent,
        data: {
            state: 'priorities',
        },
    },
    {
        path: 'developers',
        component: DevelopersComponent,
        data: {
            state: 'developers',
        },
    },
    {
        path: 'issues',
        component: IssuesComponent,
        data: {
            state: 'issues',
        },
    },
    {
        path: '',
        redirectTo: 'issues',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'issues',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
