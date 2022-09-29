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

}
