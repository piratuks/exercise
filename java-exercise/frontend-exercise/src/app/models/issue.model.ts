import { IDeveloper } from './developer.model';
import { IPriority } from './priority.model';
import { IStatus } from './status.model';
import { IType } from './type.model';

export interface IIssue {
    createdAt?: string;
    issueId?: number;
    description: string;
    title: string;
    developer?: IDeveloper;
    estimatedPoint?: number;
    priorityData?: IPriority;
    statusData?: IStatus;
    typeData?: IType;
}

export interface IIssueRequest {
    issueId?: number;
    description: string;
    title: string;
    developerId?: number;
    estimatedPoint?: number;
    priority?: string;
    status?: string;
    type: string;
}
