import { Component, OnInit } from '@angular/core';
import { IPriority } from '../models/priority.model';
import { GeneralService } from '../services/general.service';

@Component({
    selector: 'app-priorities-component',
    templateUrl: './priorities.component.html',
    styleUrls: ['./priorities.component.scss'],
})
export class PrioritiesComponent implements OnInit {
    loading: boolean = true;
    priorities: Array<IPriority> = [];
    displayedColumns: string[] = ['priority'];

    constructor(private generalService: GeneralService) {}

    ngOnInit() {
        this.generalService.priorities$().subscribe(
            (response: Array<IPriority>) => {
                this.priorities = response;
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
