import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http : HttpClient){}
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:8080/api/books/${id}`, AuthenticationService.getHttpHeaders())
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080/api/books', AuthenticationService.getHttpHeaders())
  }

  createBook(book: Book): any {
    return this.http.post<Book>('http://localhost:8080/api/books/create', book, AuthenticationService.getHttpHeaders())
  }

  updateBook(book: Book): any {
    return this.http.put<Book>(`http://localhost:8080/api/books/${book._id}/update`, book, AuthenticationService.getHttpHeaders())
  }

  deleteBook(book: Book): any {
    return this.http.delete<Book>(`http://localhost:8080/api/books/${book._id}/delete`, AuthenticationService.getHttpHeaders())
  }
}
