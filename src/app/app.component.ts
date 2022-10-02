import { Component, OnInit } from '@angular/core';

import { IBook, IBookFull } from './interfaces/book.interface';
import { HttpService } from './services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getBookList()
  }

  public loaderStatus = true;
  public bookList: IBook[] = [];

  getBookList() {
    this.httpService.getAllBooks().subscribe(data => {
      this.bookList = this.formatData(data);
      this.loaderStatus = false;
    });
  }

  formatData(data: IBookFull[]): IBook[] {
    return data.map((book): IBook => {
      return {
        id: book.id,
        title: book.title,
        description: book.description,
        pageCount: book.pageCount,
        publishDate: book.publishDate
      }
    })
  }
}
