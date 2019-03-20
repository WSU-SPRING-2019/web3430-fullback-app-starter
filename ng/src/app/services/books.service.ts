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
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:8080/api/books/${id}`, httpHeaders)
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080/api/books', httpHeaders)
  }

  createBook(book: Book): any {
    return this.http.post<Book>('http://localhost:8080/api/books/create', book, httpHeaders)
  }

  updateBook(book: Book): any {
    return this.http.put<Book>(`http://localhost:8080/api/books/${book._id}/update`, book, httpHeaders)
  }

  deleteBook(book: Book): any {
    return this.http.delete<Book>(`http://localhost:8080/api/books/${book._id}/delete`, httpHeaders)
  }
}
