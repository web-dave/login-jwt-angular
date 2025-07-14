import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { API_URL } from '../auth/auth.service';
import { Book } from './books.service';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'book-details',
  imports: [JsonPipe, RouterLink],
  template: `
    @if (book.hasValue()) {
      {{ book.value() | json }}
    }
    <a routerLink="..">back</a>
  `,
})
export class BookDetailView {
  isbn = input<string>();
  book = httpResource<Book>(() => `${API_URL}/books/${this.isbn()}`);
}
