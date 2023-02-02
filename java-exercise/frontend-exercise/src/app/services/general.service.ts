import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IType } from '../models/type.model';
import { IStatus } from '../models/status.model';
import { IPriority } from '../models/priority.model';

@Injectable({
    providedIn: 'root',
})
export class GeneralService {
    constructor(private http: HttpClient) {}

    types$ = (): Observable<Array<IType>> => {
        return this.http.get<Array<IType>>('/api/types', { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    statuses$ = (): Observable<Array<IStatus>> => {
        return this.http.get<Array<IStatus>>('/api/statuses', { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    priorities$ = (): Observable<Array<IPriority>> => {
        return this.http.get<Array<IPriority>>('/api/priorities', { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };
}
