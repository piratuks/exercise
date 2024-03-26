import { Component, OnInit } from '@angular/core';
import { MocksService } from './services/mocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'earnbet-test';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  private tableData: string[][] = [];

  constructor(private mocksService: MocksService) {}

  ngOnInit(): void {
    this.tableData = this.mocksService.getTableDataArray();
  }

  get totalDataCount(): number {
    return this.tableData.length;
  }

  onPageChanged = (currentPage: number) => {
    this.currentPage = currentPage;
  };

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.tableData.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
