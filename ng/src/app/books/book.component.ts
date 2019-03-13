import { Component, Input } from "@angular/core";
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';

@Component({
    selector: "book-el",
    templateUrl: "./book.component.html"
})
export class BookComponent {
    @Input() book : Book
    expanded : boolean = false

    constructor(private booksService : BooksService){}

    expandOrShrink(){
        this.expanded = !this.expanded
    }

    onDelete(book : Book){
        this.booksService.deleteBook(book);
    }
}