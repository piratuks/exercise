import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ISearch } from '../models/search.model';
import { _isNumberValue } from '@angular/cdk/coercion';
import { IssuesService } from '../services/issue.service';
import { IIssue, IIssueRequest } from '../models/issue.model';
import { SaveOrEditComponent } from './save-or-edit/save-or-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../services/general.service';
import { IType } from '../models/type.model';
import { DeveloperService } from '../services/developer.service';
import { IDeveloper } from '../models/developer.model';
import { IPriority } from '../models/priority.model';
import { IStatus } from '../models/status.model';

@Component({
    selector: 'app-issues-component',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
    loading: boolean = true;
    issues: Array<IIssue> = [];
    displayedColumns: string[] = [
        'issueId',
        'typeData',
        'createdAt',
        'title',
        'description',
        'developer',
        'statusData',
        'priorityData',
        'estimatedPoint',
        'actions',
    ];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    matSort!: MatSort;
    @ViewChild('search')
    search!: ElementRef;

    private types: Array<IType> = [];
    private developers: Array<IDeveloper> = [];
    private priorities: Array<IPriority> = [];
    private statuses: Array<IStatus> = [];

    constructor(
        private devService: DeveloperService,
        private matDlg: MatDialog,
        private issuesService: IssuesService,
        private generalService: GeneralService,
    ) {}

    ngOnInit() {
        this.generalService.types$().subscribe(
            (response: Array<IType>) => {
                this.types = response;
            },
            () => {
                this.loading = false;
            },
        );

        this.devService.developers$().subscribe(
            (response: Array<IDeveloper>) => {
                this.developers = response;
            },
            () => {
                this.loading = false;
            },
        );

        this.generalService.priorities$().subscribe(
            (response: Array<IPriority>) => {
                this.priorities = response;
            },
            () => {
                this.loading = false;
            },
        );

        this.generalService.statuses$().subscribe(
            (response: Array<IStatus>) => {
                this.statuses = response;
            },
            () => {
                this.loading = false;
            },
        );
    }

    ngAfterViewInit() {
        this.issuesService.issues$().subscribe(
            (response: Array<IIssue>) => {
                this.issues = response;
                this.dataSource = new MatTableDataSource(this.issues);
                if (this.paginator) {
                    this.dataSource.paginator = this.paginator;
                }
                if (this.matSort) {
                    this.dataSource.sort = this.matSort;
                    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
                }
                this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
            },
            () => {
                this.loading = false;
            },
            () => {
                this.loading = false;
            },
        );

        fromEvent(this.search.nativeElement, 'keyup')
            .pipe(
                distinctUntilChanged(),
                tap(() => {
                    const searchData: ISearch = { time: performance.now().toString(), searchTerm: this.search.nativeElement.value };
                    this.dataSource.filter = JSON.stringify(searchData);
                }),
            )
            .subscribe();
    }

    editClick = (data: IIssue) => {
        const dialogRef = this.matDlg.open(SaveOrEditComponent, {
            width: '500px',
            data: {
                issue: data,
                types: this.types,
                developers: this.developers,
                priorities: this.priorities,
                statuses: this.statuses,
            },
        });

        dialogRef.afterClosed().subscribe((result: IIssueRequest) => {
            if (result) {
                this.saveOrEdit(result);
            }
        });
    };

    addClick = () => {
        const dialogRef = this.matDlg.open(SaveOrEditComponent, {
            width: '500px',
            data: {
                issue: null,
                types: this.types,
                developers: this.developers,
                priorities: this.priorities,
                statuses: this.statuses,
            },
        });

        dialogRef.afterClosed().subscribe((result: IIssueRequest) => {
            if (result) {
                this.saveOrEdit(result);
            }
        });
    };

    removeClick = (data: IIssue) => {
        if (data.issueId)
            this.issuesService.removeIssue$(data.issueId).subscribe(
                (response: any) => {
                    this.issues = this.issues.filter((item) => {
                        return item.issueId !== data.issueId;
                    });
                    this.dataSource.data = this.issues;
                },
                () => {
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                },
            );
    };

    private saveOrEdit = (data: IIssueRequest) => {
        this.issuesService.saveOrUpdateDeveloper$(data).subscribe(
            (response: IIssue) => {
                const newDev = this.issues.find((item) => {
                    return item.issueId === response.issueId;
                });
                if (newDev && typeof newDev !== 'undefined') {
                    newDev.issueId = response.issueId;
                    newDev.title = response.title;
                    newDev.createdAt = response.createdAt;
                    newDev.description = response.description;
                    newDev.title = response.title;
                    newDev.developer = response.developer;
                    newDev.estimatedPoint = response.estimatedPoint;
                    newDev.priorityData = response.priorityData;
                    newDev.typeData = response.typeData;
                    newDev.statusData = response.statusData;
                } else {
                    this.issues.push(response);
                }
                this.dataSource.data = this.issues;
            },
            () => {
                this.loading = false;
            },
        );
    };

    private sortingDataAccessor = (data: any, sortHeaderId: string) => {
        const MAX_SAFE_INTEGER = 9007199254740991;
        let value: any = data[sortHeaderId];
        if (sortHeaderId === 'typeData') {
            value = data[sortHeaderId].type;
        } else if (sortHeaderId === 'developer') {
            value = data[sortHeaderId]?.name;
        } else if (sortHeaderId === 'statusData') {
            value = data[sortHeaderId]?.status;
        } else if (sortHeaderId === 'priorityData') {
            value = data[sortHeaderId]?.priority;
        }
        if (_isNumberValue(value)) {
            const numberValue = Number(value);
            return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
        } else if (Date.parse(value)) {
            return new Date(value);
        } else {
            return value;
        }
    };

    private customFilterPredicate = (data: IIssue, filter: string): boolean => {
        const searchData: ISearch = JSON.parse(filter);
        if (searchData.searchTerm) {
            let found = true;
            if (searchData.searchTerm) {
                found = data.title.toString().toLowerCase().indexOf(searchData.searchTerm.toString().toLowerCase()) > -1;
            }

            return found;
        }
        return true;
    };
}
