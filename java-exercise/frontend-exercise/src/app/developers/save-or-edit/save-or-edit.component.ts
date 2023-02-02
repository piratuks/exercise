import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDeveloper } from 'src/app/models/developer.model';
import { FunctionService } from 'src/app/services/functions.service';

@Component({
    selector: 'app-save-or-edit',
    templateUrl: './save-or-edit.component.html',
    styleUrls: ['./save-or-edit.component.scss'],
})
export class SaveOrEditComponent implements OnInit, OnDestroy {
    developer: IDeveloper = {
        name: '',
    };

    constructor(
        public dialogRef: MatDialogRef<SaveOrEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private functionService: FunctionService,
    ) {}

    ngOnDestroy() {}

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onCreateClick(): void {
        this.dialogRef.close(this.developer);
    }

    ngOnInit(): void {
        if (this.data.developer) this.developer = this.functionService.deepCopy(this.data.developer);
    }
}
