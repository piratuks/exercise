import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
    providedIn: 'root',
})
export class FunctionService {
    constructor() {}

    copyFormControl = (control: AbstractControl): any => {
        if (control instanceof FormControl) {
            return new FormControl(control.value);
        } else if (control instanceof FormGroup) {
            const copy = new FormGroup({});
            Object.keys(control.controls).forEach((key) => {
                copy.addControl(key, this.copyFormControl(control.controls[key]));
            });
            return copy;
        } else if (control instanceof FormArray) {
            const copy = new FormArray([]);
            control.controls.forEach((c: any) => {
                copy.push(this.copyFormControl(c));
            });
            return copy;
        }
    };

    deepCopy<T>(instance: T): T {
        if (instance === null) {
            return instance;
        }

        if (instance instanceof MatTableDataSource) {
            return instance;
        }

        if (instance instanceof FormGroup) {
            return this.copyFormControl(instance);
        }

        // handle Dates
        if (instance instanceof Date) {
            return new Date(instance.getTime()) as any;
        }

        // handle Array types
        if (instance instanceof Array) {
            const cloneArr = [] as any[];
            (instance as any[]).forEach((value) => {
                cloneArr.push(value);
            });
            // for nested objects
            return cloneArr.map((value: any) => this.deepCopy<any>(value)) as any;
        }

        // handle objects
        if (instance instanceof Object) {
            const copyInstance = { ...(instance as { [key: string]: any }) } as { [key: string]: any };
            for (const attr in instance) {
                if ((instance as any).hasOwnProperty(attr)) {
                    copyInstance[attr] = this.deepCopy<any>((instance as any)[attr]);
                }
            }
            return copyInstance as T;
        }

        // handling primitive data types
        return instance;
    }
}
