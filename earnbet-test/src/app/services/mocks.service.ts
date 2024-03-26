import { Injectable } from '@angular/core';
import { randomNumber } from './functions';

@Injectable({ providedIn: 'root' })
export class MocksService {
  private tableData1: string[][] = [];
  private tick: number = 15;

  // private tableData2: TableMeta = {};

  constructor() {}

  getTableDataArray = () => {
    this.populateDummyDataArray();
    return this.tableData1;
  };

  // getTableDataObject = () => {
  //   this.populateDummyDataObject();
  //   return this.tableData2;
  // };

  private populateDummyDataArray = () => {
    const rows: string[][] = [];
    let newTick = this.tick;

    for (let i = 0; i < 5; i++) {
      const columns: string[] = [];
      for (let k = 0; k < 3; k++) {
        newTick = this.tick * (k + 1);
        const number = randomNumber(newTick, this.tick);
        columns.push(number.toString());
      }

      rows.push(columns);
    }

    this.tableData1 = rows;
  };
}
