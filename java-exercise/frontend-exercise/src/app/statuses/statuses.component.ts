import { Component, OnInit } from '@angular/core';
import { IStatus } from '../models/status.model';
import { GeneralService } from '../services/general.service';

@Component({
    selector: 'app-statuses-component',
    templateUrl: './statuses.component.html',
    styleUrls: ['./statuses.component.scss'],
})
export class StatusesComponent implements OnInit {
    loading: boolean = true;
    statuses: Array<IStatus> = [];
    displayedColumns: string[] = ['status'];

    constructor(private generalService: GeneralService) {}

    ngOnInit() {
        this.generalService.statuses$().subscribe(
            (response: Array<IStatus>) => {
                this.statuses = response;
            },
            () => {
                this.loading = false;
            },
            () => {
                this.loading = false;
            },
        );
    }
}
