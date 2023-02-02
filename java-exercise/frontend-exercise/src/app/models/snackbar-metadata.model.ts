import { AlertTypes } from '../enums/alert-types';

export interface ISnackbarMetadata {
    message: string;
    infoType: AlertTypes;
    duration: number;
}
