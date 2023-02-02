import { trigger, animate, style, group, query, transition, state, animateChild } from '@angular/animations';

export const detailExpand = trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: 'auto' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    transition('void => collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    transition('void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const routerTransitionX = trigger('routerTransition', [
    transition('-1 <=> *', [
        group([
            query(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))], {
                optional: true,
            }),
        ]),
    ]),
    transition('* <=> *', [
        group([
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            query(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))], {
                optional: true,
            }),
            query(':leave', [style({ transform: 'translateX(0%)' }), animate('200ms ease-in-out', style({ transform: 'translateX(-100%)' }))], {
                optional: true,
            }),
        ]),
    ]),
]);
