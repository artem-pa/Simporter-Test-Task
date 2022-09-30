import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBookFull } from '../../interfaces/book.interface';
import { API_URL } from 'src/app/constants/api.constant';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get<IBookFull[]>(API_URL)
  }
}