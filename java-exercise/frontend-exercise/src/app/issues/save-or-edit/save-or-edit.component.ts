import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertTypes } from 'src/app/enums/alert-types';
import { IDeveloper } from 'src/app/models/developer.model';
import { IIssue, IIssueRequest } from 'src/app/models/issue.model';
import { IPriority } from 'src/app/models/priority.model';
import { IStatus } from 'src/app/models/status.model';
import { IType } from 'src/app/models/type.model';
import { FunctionService } from 'src/app/services/functions.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-save-or-edit',
    templateUrl: './save-or-edit.component.html',
    styleUrls: ['./save-or-edit.component.scss'],
})
export class SaveOrEditComponent implements OnInit, OnDestroy {
    issue: IIssue = {
        description: '',
        title: '',
        developer: {
            name: '',
        },
        priorityData: {
            priority: '',
        },
        statusData: {
            status: '',
        },
        typeData: {
            type: '',
        },
    };
    types: Array<IType> = [];
    developers: Array<IDeveloper> = [];
    priorities: Array<IPriority> = [];
    statuses: Array<IStatus> = [];

    selectedType?: string;
    selectedDev?: number;
    selectedPriority?: string;
    selectedStatus?: string;

    constructor(
        private snackbarService: SnackbarService,
        public dialogRef: MatDialogRef<SaveOrEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private functionService: FunctionService,
    ) {}

    ngOnDestroy() {}

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onCreateClick(): void {
        if (this.selectedType) {
            let issueRequest: IIssueRequest = {
                description: this.issue.description,
                title: this.issue.title,
                type: this.selectedType,
            };

            if (this.selectedDev) {
                issueRequest.developerId = this.selectedDev;
            }
            if (this.issue.issueId) {
                issueRequest.issueId = this.issue.issueId;
            }

            if (this.selectedPriority && this.selectedType === 'Bug') {
                issueRequest.priority = this.selectedPriority;
            }

            if (this.selectedStatus) {
                issueRequest.status = this.selectedStatus;
            }
            if (this.issue.estimatedPoint !== null && typeof this.issue.estimatedPoint !== 'undefined') {
                issueRequest.estimatedPoint = this.issue.estimatedPoint;
            }
            this.dialogRef.close(issueRequest);
        } else {
            this.snackbarService.openSnackBar('Somthing happened. Please try again', AlertTypes.error);
        }
    }

    onSelectionChangedAction = () => {
        if (this.selectedType === 'Bug') {
            if (this.data.statuses)
                this.statuses = this.functionService.deepCopy(this.data.statuses).filter((item: IStatus) => {
                    return item.status === 'New' || item.status === 'Verified' || item.status === 'Resolved';
                });
            this.issue.estimatedPoint = undefined;
        } else if (this.selectedType === 'Story') {
            if (this.data.statuses)
                this.statuses = this.functionService.deepCopy(this.data.statuses).filter((item: IStatus) => {
                    return item.status === 'New' || item.status === 'Estimated' || item.status === 'Completed';
                });
            this.issue.priorityData = undefined;
        } else {
            this.statuses = [];
        }
    };

    ngOnInit(): void {
        if (this.data.issue) {
            this.issue = this.functionService.deepCopy(this.data.issue);
            this.selectedType = this.issue.typeData?.type;
            this.selectedDev = this.issue.developer?.developerId;
            this.selectedPriority = this.issue.priorityData?.priority;
            this.selectedStatus = this.issue.statusData?.status;
        }
        if (this.data.types) this.types = this.functionService.deepCopy(this.data.types);
        if (this.data.developers) this.developers = this.functionService.deepCopy(this.data.developers);
        if (this.data.priorities) this.priorities = this.functionService.deepCopy(this.data.priorities);
        this.onSelectionChangedAction();
    }
}
