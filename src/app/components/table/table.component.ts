import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { utils, writeFile } from 'xlsx';

import { IBook } from 'src/app/interfaces/book.interface';

type FilterStatus = 'asc' | 'desc';
type FilterType = 'title' | 'description' | 'pageCount' | 'publishDate';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() bookList: IBook[] = [];
  @ViewChild('table') table: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  searchQuery = '';
  activeFilter: [FilterType | null, FilterStatus] = [null, 'asc'];

  setActiveFilter(type: FilterType) {
    if (type !== this.activeFilter[0]) return this.activeFilter = [type, 'asc'];
    return this.activeFilter = this.activeFilter[1] === 'asc' ? [type, 'desc'] : [type, 'asc'];
  }

  exportToEscel() {
    if (this.sortedBookList.length === 0) return;
    const workbook = utils.table_to_book(this.table.nativeElement, { sheet: 'Sheet 1' })
    return writeFile(workbook, 'BookList.xlsx', {});

  }

  get filteredBookList(): IBook[] {
    if (this.searchQuery === '') return this.bookList;
    return this.bookList.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
  }

  get sortedBookList(): IBook[] {
    const sortType = this.activeFilter[1] === 'asc' ? 1 : -1;

    switch (this.activeFilter[0]) {
      case 'title':
        return [...this.filteredBookList].sort((a, b) => {
          const A = a.title.toLowerCase();
          const B = b.title.toLowerCase();
          if (A > B) return 1 * sortType;
          if (B > A) return -1 * sortType;
          return 0;
        })
      case 'description':
        return [...this.filteredBookList].sort((a, b) => {
          const A = a.description.toLowerCase();
          const B = b.title.toLowerCase();
          if (A > B) return 1 * sortType;
          if (B > A) return -1 * sortType;
          return 0;
        })
      case 'pageCount':
        return [...this.filteredBookList].sort((a, b) => {
          return (a.pageCount - b.pageCount) * sortType;
        })
      case 'publishDate':
        return [...this.filteredBookList].sort((a, b) => {
          return (Date.parse(a.publishDate) - Date.parse(b.publishDate)) * sortType;
        })
      default:
        return this.filteredBookList;
    }
  }

  get filterSymbol() {
    return this.activeFilter[1] === 'asc' ? '▲' : '▼';
  }
}
