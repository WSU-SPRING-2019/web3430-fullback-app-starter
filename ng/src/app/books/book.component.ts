import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "book-el",
    templateUrl: "./book.component.html"
})
export class BookComponent {
    @Input() book : Book
    @Output() bookDeleted: EventEmitter<Book> = new EventEmitter()
    expanded : boolean = false

    constructor(private booksService : BooksService, private toastr : ToastrService){}

    expandOrShrink(){
        this.expanded = !this.expanded
    }

    onDelete(book : Book){
        this.booksService.deleteBook(book).subscribe(res => {
            this.bookDeleted.emit(res)
            this.toastr.success("The book has been successfully deleted.")
        })
    }
}