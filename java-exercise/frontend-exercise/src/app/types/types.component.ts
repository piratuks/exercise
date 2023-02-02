import { Component, OnInit } from '@angular/core';
import { IType } from '../models/type.model';
import { GeneralService } from '../services/general.service';

@Component({
    selector: 'app-types-component',
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
    loading: boolean = true;
    types: Array<IType> = [];
    displayedColumns: string[] = ['type'];

    constructor(private generalService: GeneralService) {}

    ngOnInit() {
        this.generalService.types$().subscribe(
            (response: Array<IType>) => {
                this.types = response;
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
