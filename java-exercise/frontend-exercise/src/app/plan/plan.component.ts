import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatNode, IPlanNode, IPlanRequestResponse } from '../models/plan.model';
import { IssuesService } from '../services/issue.service';

@Component({
    selector: 'app-plan-component',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
    private _transformer = (node: IPlanNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    };

    treeControl = new FlatTreeControl<FlatNode>(
        (node) => node.level,
        (node) => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children,
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    plan: any;
    constructor(private issueService: IssuesService) {}

    hasChild = (_: number, node: FlatNode) => node.expandable;
    loading: boolean = true;

    ngOnInit() {
        this.issueService.plan$().subscribe(
            (response: IPlanRequestResponse[]) => {
                let stringPrefix = 'Date from';
                let stringMid = 'to';

                const distinctLevels = [...new Set(response.map((item) => `${item.startDate}|${item.endDate}`))];
                let planTree: IPlanNode[] = [];
                distinctLevels.forEach((item) => {
                    const ranges = item.split('|');
                    const startDate = ranges[0];
                    const endDate = ranges[1];

                    //developer children per date range
                    let planDevTree: IPlanNode[] = [];
                    const rowsPerRange = response.filter((r) => {
                        return r.startDate === startDate && r.endDate === endDate;
                    });
                    const distinctPerDev = [...new Set(rowsPerRange.map((rpr) => `${rpr.developer.developerId}|${rpr.developer.name}`))];
                    distinctPerDev.forEach((dpd) => {
                        const devs = dpd.split('|');
                        const devID = devs[0];
                        const devName = devs[1];

                        let planIssueTree: IPlanNode[] = [];
                        const devIssues = response.filter((r) => {
                            return r.startDate === startDate && r.endDate === endDate && r.developer.developerId === Number(devID);
                        });
                        devIssues.forEach((dv) => {
                            dv.issues.forEach((devIssues) => {
                                planIssueTree.push({
                                    name: `ID: ${devIssues.issueId} / Title: ${devIssues.title} / Points: ${devIssues.estimatedPoint} / Points: ${devIssues.statusData?.status}`,
                                });
                            });
                        });

                        planDevTree.push({
                            name: devName,
                            children: planIssueTree,
                        });
                    });

                    planTree.push({
                        name: `Date from ${startDate} to ${endDate}`,
                        children: planDevTree,
                    });
                });

                this.dataSource.data = planTree;
                // console.log(...new Set(response.map((item) => `Date from ${item.startDate} to ${item.endDate}`);
            },
            () => {
                this.loading = false;
            },
            () => {
                this.loading = false;
            },
        );
    }
}
