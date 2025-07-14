import { Component, inject } from '@angular/core';
import { BooksService } from './books.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  template: `
    <div class="container" id="container">
      <h2>Book List</h2>
      <ul>
        @if (books.hasValue()) {
          @for (book of books.value(); track book.isbn) {
            <li>
              <a [routerLink]="[book.isbn]"
                ><strong>{{ book.title }}</strong> by {{ book.author }}
              </a>
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
