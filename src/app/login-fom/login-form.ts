import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.html',
  imports: [FormsModule],
})
export class LoginForm {
  newUser = signal(true);
  service = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  user = {
    email: '',
    password: '',
  };

  sendIt() {
    console.log('=====> sendIt');
    if (this.newUser()) {
      this.service.register(this.user).subscribe({
        next: () => this.newUser.set(false),
      });
    } else {
      this.service.login(this.user).subscribe({
        next: () => this.router.navigate(['books']),
      });
    }
  }
}
