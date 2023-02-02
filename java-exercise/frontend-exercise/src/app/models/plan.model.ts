import { IDeveloper } from './developer.model';
import { IIssue } from './issue.model';

export interface IPlanRequestResponse {
    startDate: string;
    endDate: string;
    issues: Array<IIssue>;
    developer: IDeveloper;
}

export interface IPlanNode {
    name: string;
    children?: IPlanNode[];
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
}
