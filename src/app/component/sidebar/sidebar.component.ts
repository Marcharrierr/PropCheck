import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  private authService = inject(AuthService);
  sidebarVisible!: boolean;
  
  agentData: any;
  clientData: any;

  ngOnInit(): void {
    // Obtener los datos del cliente del localStorage
    const agentStoredData = localStorage.getItem('agentData');
    if (agentStoredData) {
      this.agentData = JSON.parse(agentStoredData);
    }

    const clientStoredData = localStorage.getItem('clientData');
    if (clientStoredData) {
      this.clientData = JSON.parse(clientStoredData);
    }
  }
  onLogout() {
    this.authService.logout();
  }
}
