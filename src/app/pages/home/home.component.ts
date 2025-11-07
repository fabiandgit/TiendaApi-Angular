import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private authService = inject(AuthService);
  userName = signal<string | null>('');

  ngOnInit() {
    this.userName.set(this.authService.getuserName());
  }
}
