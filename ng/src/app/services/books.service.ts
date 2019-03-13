import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { BEST_SELLERS } from '../models/books';
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
    for (let book of BEST_SELLERS) {
      if (book.id === id) {
        return of(book)
      }
    }

    return of(null)
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/assets/data.json', httpHeaders)
  }

  createBook(book: Book): any {
    let newId: number
    let found: boolean = false
    while (true) {
      found = false
      newId = Math.floor(Math.random() * 100200)
      for (let b of BEST_SELLERS) {
        if (b.id === newId) {
          found = true
          break;
        }
      }
      if (!found) break
    }

    book.id = newId
    BEST_SELLERS.push(book)

    return of(book)
  }

  updateBook(book: Book): any {
    for (let b of BEST_SELLERS) {
      if (b.id === book.id) {
        Object.assign(b, book)
        return of(book)
      }
    }

    return of(null)
  }

  deleteBook(book: Book): any {
    BEST_SELLERS.splice(BEST_SELLERS.indexOf(book), 1)
  }
}
