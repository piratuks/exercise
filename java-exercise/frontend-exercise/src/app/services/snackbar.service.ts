import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertTypes } from '../enums/alert-types';
import { ISnackbarMetadata } from '../models/snackbar-metadata.model';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    private processingMessage = false;
    private messageQueue: ISnackbarMetadata[] = [];

    constructor(public snackBar: MatSnackBar) {}

    public openSnackBar = (message: string, infoType: AlertTypes, duration: number = 5000): void => {
        this.messageQueue.push({ message, infoType, duration });
        if (!this.processingMessage) {
            this.displaySnackbar();
        }
    };

    private displaySnackbar = (): void => {
        const nextMessage: ISnackbarMetadata | undefined = this.getNextMessage();

        if (!nextMessage) {
            this.processingMessage = false;
            return;
        }

        this.processingMessage = true;

        let options: any = {
            data: { message: nextMessage.message, infoType: nextMessage.infoType },
            duration: nextMessage.duration,
            horizontalPosition: 'left',
            panelClass: [nextMessage.infoType + '-snackbar'],
        };
        if (nextMessage.infoType === AlertTypes.error) {
            options = {
                data: { message: nextMessage.message, infoType: nextMessage.infoType },
                horizontalPosition: 'left',
                panelClass: [nextMessage.infoType + '-snackbar'],
            };
        }
        this.snackBar
            .openFromComponent(SnackbarComponent, options)
            .afterDismissed()
            .subscribe(() => {
                this.displaySnackbar();
            });
    };

    private getNextMessage(): ISnackbarMetadata | undefined {
        return this.messageQueue.length ? this.messageQueue.shift() : undefined;
    }
}
