import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBookFull } from '../../interfaces/book.interface';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
  private url = 'https://fakerestapi.azurewebsites.net/api/v1/books';

  getAllBooks() {
    return this.http.get<IBookFull[]>(this.url)
  }
}