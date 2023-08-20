import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  projectName!: string;
  projects: any[] = [];
  clickedProjectId: string | null = null;
  userId!: string;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  onCreateProject() {
    if (!this.projectName) {
      // Vérifier si le nom du projet a été saisi
      alert('Veuillez saisir un nom de projet.');
      return;
    }

    // Appeler la méthode createProject du service ApiService pour créer le projet
    this.apiService.createProject(this.projectName).subscribe(
      (response) => {
        // Gérer la réponse de l'API si nécessaire
        console.log('Projet créé avec succès:', response);
        this.refreshProjects();
      },
      (error) => {
        // Gérer l'erreur s'il y en a une
        console.error('Erreur lors de la création du projet:', error);
      }
    );
  }
  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    this.route.params.subscribe(params => {
      this.userId = params['id'];

      // Appeler la méthode pour récupérer les projets de l'utilisateur en utilisant l'ID de l'utilisateur
      this.apiService.getProjects(this.userId).subscribe(
        (response) => {
          // Récupérer les projets de la réponse
          this.projects = response.projects;
        },
        (error) => {
          console.error('Erreur lors de la récupération des projets:', error);
        }
      );
    });
  }


  // Méthode pour rafraîchir la liste des projets
  refreshProjects() {
    // Récupérer current_user_id (assurez-vous de le définir après la connexion)
    const currentUserId = 'votre_current_user_id';

    // Appeler la méthode pour récupérer les projets de l'utilisateur en passant l'ID de l'utilisateur
    this.apiService.getProjects(currentUserId).subscribe(
      (response) => {
        // Récupérer les projets de la réponse
        this.projects = response.projects;
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    );
  }

}
