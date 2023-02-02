import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertTypes } from '../enums/alert-types';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private urlsToNotUse: Array<string> = [];

    constructor(private snackbarService: SnackbarService) {
        this.urlsToNotUse = ['assets/.+'];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isValidRequestForInterceptor(request.url)) {
            return next.handle(request);
        }

        return next.handle(request).pipe(
            tap(
                () => {},
                (error: HttpErrorResponse) => {
                    this.handleError(error, request.url);
                },
            ),
        );
    }

    private handleError = async (error: HttpErrorResponse, url: string) => {
        let msg = error?.error?.message || 'Somthing happened. Please try again';
        let type = AlertTypes.error;

        if (msg) {
            this.snackbarService.openSnackBar(msg, type);
        }
    };

    private isValidRequestForInterceptor = (requestUrl: string): boolean => {
        for (const address of this.urlsToNotUse) {
            if (new RegExp(address).test(requestUrl)) {
                return false;
            }
        }
        return true;
    };
}
