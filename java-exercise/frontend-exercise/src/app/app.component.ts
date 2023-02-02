import { Component } from '@angular/core';
import { routerTransitionX } from './animations/router.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routerTransitionX],
})
export class AppComponent {
    showFiller = false;
    navLinks: Array<{ label: string; link: string }>;

    constructor() {
        this.navLinks = [
            {
                label: 'Issues',
                link: '/issues',
            },
            {
                label: 'Developers',
                link: '/developers',
            },
            {
                label: 'Priorities',
                link: '/priorities',
            },
            {
                label: 'Statuses',
                link: '/statuses',
            },
            {
                label: 'Types',
                link: '/types',
            },
            {
                label: 'Plan',
                link: '/plan',
            },
        ];
    }

    getState = (outlet: any) => {
        return typeof outlet.activatedRouteData.state === 'undefined' ? -1 : outlet.activatedRouteData.state;
    };
}
