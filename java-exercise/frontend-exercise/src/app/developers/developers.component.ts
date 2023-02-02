import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { IDeveloper } from '../models/developer.model';
import { ISearch } from '../models/search.model';
import { DeveloperService } from '../services/developer.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { MatDialog } from '@angular/material/dialog';
import { SaveOrEditComponent } from './save-or-edit/save-or-edit.component';

@Component({
    selector: 'app-developers-component',
    templateUrl: './developers.component.html',
    styleUrls: ['./developers.component.scss'],
})
export class DevelopersComponent implements OnInit {
    loading: boolean = true;
    developers: Array<IDeveloper> = [];
    displayedColumns: string[] = ['name', 'actions'];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    matSort!: MatSort;
    @ViewChild('search')
    search!: ElementRef;

    constructor(private matDlg: MatDialog, private devService: DeveloperService) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.devService.developers$().subscribe(
            (response: Array<IDeveloper>) => {
                this.developers = response;
                this.dataSource = new MatTableDataSource(this.developers);
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

    editClick = (data: IDeveloper) => {
        const dialogRef = this.matDlg.open(SaveOrEditComponent, {
            width: '500px',
            data: {
                developer: data,
            },
        });

        dialogRef.afterClosed().subscribe((result: IDeveloper) => {
            if (result) {
                this.saveOrEdit(result);
            }
        });
    };

    addClick = () => {
        const dialogRef = this.matDlg.open(SaveOrEditComponent, {
            width: '500px',
            data: {
                developer: null,
            },
        });

        dialogRef.afterClosed().subscribe((result: IDeveloper) => {
            if (result) {
                this.saveOrEdit(result);
            }
        });
    };

    removeClick = (data: IDeveloper) => {
        if (data.developerId)
            this.devService.removeDeveloper$(data.developerId).subscribe(
                (response: any) => {
                    this.developers = this.developers.filter((item) => {
                        return item.developerId !== data.developerId;
                    });
                    this.dataSource.data = this.developers;
                },
                () => {
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                },
            );
    };

    private saveOrEdit = (data: IDeveloper) => {
        this.devService.saveOrUpdateDeveloper$(data).subscribe(
            (response: IDeveloper) => {
                const newDev = this.developers.find((item) => {
                    return item.developerId === response.developerId;
                });
                if (newDev && typeof newDev !== 'undefined') {
                    newDev.developerId = response.developerId;
                    newDev.name = response.name;
                } else {
                    this.developers.push(response);
                }
                this.dataSource.data = this.developers;
            },
            () => {
                this.loading = false;
            },
        );
    };

    private sortingDataAccessor = (data: any, sortHeaderId: string) => {
        const MAX_SAFE_INTEGER = 9007199254740991;
        const value: any = data[sortHeaderId];
        if (_isNumberValue(value)) {
            const numberValue = Number(value);
            return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
        } else if (Date.parse(value)) {
            return new Date(value);
        } else {
            return value;
        }
    };

    private customFilterPredicate = (data: IDeveloper, filter: string): boolean => {
        const searchData: ISearch = JSON.parse(filter);
        if (searchData.searchTerm) {
            let found = true;
            if (searchData.searchTerm) {
                found = data.name.toString().toLowerCase().indexOf(searchData.searchTerm.toString().toLowerCase()) > -1;
            }

            return found;
        }
        return true;
    };
}
