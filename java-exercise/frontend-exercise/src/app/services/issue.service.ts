import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IIssue, IIssueRequest } from '../models/issue.model';
import { IPlanRequestResponse } from '../models/plan.model';

@Injectable({
    providedIn: 'root',
})
export class IssuesService {
    constructor(private http: HttpClient) {}

    issues$ = (): Observable<Array<IIssue>> => {
        return this.http.get<Array<IIssue>>('/api/issues', { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    removeIssue$ = (id: number): Observable<any> => {
        return this.http.delete<any>(`/api/issue/${id}`, { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    saveOrUpdateDeveloper$ = (data: IIssueRequest): Observable<IIssue> => {
        return this.http.post<IIssue>(`/api/issue`, data, { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    plan$ = (): Observable<IPlanRequestResponse[]> => {
        return this.http.get<IPlanRequestResponse[]>('/api/plan', { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };
}
