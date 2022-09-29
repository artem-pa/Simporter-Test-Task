import { Component, OnInit } from '@angular/core';
import { IBook, IBookFull } from './interfaces/book.interface';

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { HttpService } from './services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getBookList()
  }

  public bookList: IBook[] = [];

  getBookList() {
    const url = 'https://fakerestapi.azurewebsites.net/api/v1/books';
    this.httpService.getAllBooks().subscribe(data => {
      this.bookList = this.formatData(data)
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
