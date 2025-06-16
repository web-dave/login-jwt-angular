import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavigationBarComponent } from './top-navigation-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNavigationBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'login-jwt';

  // foo = inject(HttpClient).get('http://localhost:4730/books').subscribe();
}
