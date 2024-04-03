import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  totalDataCount: number = 0;
  @Input()
  currentPage: number = 0;
  @Input()
  itemsPerPage: number = 0;
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}

  get totalPages(): number[] {
    return Array(Math.ceil(this.totalDataCount / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.onPageChanged.emit(this.currentPage);
  }
}
