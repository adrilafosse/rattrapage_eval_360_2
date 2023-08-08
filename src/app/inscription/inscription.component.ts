import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  firstName: string = '';
  email: string = '';
  password: string = '';
  showConnexion: boolean = false;

  constructor(private router: Router, private apiService: ApiService) { }

  allerVersConnexion() {
    this.router.navigate(['/connexion']);
  }

  createUser() {
    // Utilisez les valeurs de firstName, email et password pour créer l'utilisateur via l'API
    this.apiService.createUser(this.firstName, this.email, this.password).subscribe(
      (response) => {
        console.log('Utilisateur créé avec succès:', response);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      }
    );
  }
}
