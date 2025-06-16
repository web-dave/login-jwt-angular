import { Component, inject, Input } from '@angular/core';
import { BooksService } from './books.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, NEVER } from 'rxjs';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="container" id="container">
      <h2>Book List</h2>
      <ul>
        @for(book of books();track book.isbn){
        <li>
          <strong>{{ book.title }}</strong> by {{ book.author }}
        </li>
        }
      </ul>
    </div>
  `,
})
export class BookListComponent {
  books$ = inject(BooksService).getBooks();
  books = toSignal(this.books$);
}
