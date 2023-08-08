import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public isLoggedIn: boolean = false;

  constructor(private router: Router, private apiService: ApiService) { }

  allerVersInscription() {
    this.router.navigate(['/inscription']);
  }

  loginUser() {
    this.apiService.loginWithEmailAndPasword(this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Login successful');
          this.router.navigate(['/accueil']);

        },
        (error) => {
          console.error('Error during login:', error);
          this.errorMessage = 'E-mail ou mot de passe incorrect.';
        }
      );
  }


}
