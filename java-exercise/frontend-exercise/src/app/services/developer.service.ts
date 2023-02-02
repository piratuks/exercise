import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDeveloper } from '../models/developer.model';

@Injectable({
    providedIn: 'root',
})
export class DeveloperService {
    constructor(private http: HttpClient) {}

    developers$ = (): Observable<Array<IDeveloper>> => {
        return this.http.get<Array<IDeveloper>>('/api/developers', { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    removeDeveloper$ = (id: number): Observable<any> => {
        return this.http.delete<any>(`/api/developer/${id}`, { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };

    saveOrUpdateDeveloper$ = (data: IDeveloper): Observable<IDeveloper> => {
        return this.http.post<IDeveloper>(`/api/developer`, data, { withCredentials: true }).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    };
}
