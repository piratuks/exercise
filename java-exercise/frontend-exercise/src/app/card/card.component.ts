import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-card-component',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input()
    headerText!: string;

    constructor() {}

    ngOnInit() {}
}
