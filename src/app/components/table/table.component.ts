import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() bookList: IBook[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  searchQuery = '';

  get filteredBookList(): IBook[] {
    if (this.searchQuery === '') return this.bookList;
    return this.bookList.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
  }
}
