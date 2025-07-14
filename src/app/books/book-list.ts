import { Component, inject, Input } from '@angular/core';
import { Book, BooksService } from './books.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, NEVER } from 'rxjs';
import { httpResource } from '@angular/common/http';
import { API_URL } from '../auth/auth.service';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="container" id="container">
      <h2>Book List</h2>
      <ul>
        @if (books.hasValue()) {
          @for (book of books.value(); track book.isbn) {
            <li>
              <strong>{{ book.title }}</strong> by {{ book.author }}
            </li>
          }
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BookListComponent {
  books$ = inject(BooksService).getBooks();
  // books = toSignal(this.books$);

  books = rxResource({
    stream: () => this.books$,
    defaultValue: [],
  });

  // booksH = httpResource<Book[]>(
  //   () => {
  //     const foo = 'bar';
  //     return `${API_URL}/books`;
  //   },
  //   { defaultValue: [] },
  // );
}
