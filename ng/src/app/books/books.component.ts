import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';

@Component({
    //selector: 'books-el',
    templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
    constructor(private booksService : BooksService){}
    books : Book[] = []

    ngOnInit(): void {
        this.updateListing()
    }

    updateListing(){
        this.booksService.getBooks().subscribe(data => this.books = data)
    }
    
    sortByTitle(){
        this.books.sort((b1, b2) => {
            if(b1.title == b2.title) return 0
            else if(b1.title < b2.title) return -1
            else return 1
        })
    }

}