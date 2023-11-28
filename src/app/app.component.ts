import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './interfaces';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PropCheck';


  private authService = inject(AuthService);
  private router = inject(Router);



  public finAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false
    }
    return true
  });

  public authStatusEffect = effect(() => {

    switch (this.authService.authStatus()) {

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/propiedades/list');
        return;


      case AuthStatus.checking:
        return;


      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/');
        return;

    }


  })


}


