import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http : HttpClient){}
  getBook(id: number): Observable<Book> {
    //TODO
    return of(null)
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080/api/books', httpHeaders)
  }

  createBook(book: Book): any {
    return this.http.post<Book>('http://localhost:8080/api/books/create', book, httpHeaders)
  }

  updateBook(book: Book): any {
    //TODO
    return of(null)
  }

  deleteBook(book: Book): any {
    //TODO
  }
}
