import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projectId!: string;
  projectDetails: any;
  selectedFile!: File;
  groups: any[] = [];
  projectName!: string;
  uniqueLinks: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') || '';
      this.projectName = params.get('name') || '';


      this.apiService.getGroupsWithStudents(this.projectId)
        .subscribe(
          (data: any) => {
            this.groups = data.groups;
          },
          error => {
            console.error('Erreur lors de la récupération des groupes avec étudiants :', error);
          }
        );


    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onImportData() {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier CSV.');
      return;
    }

    this.apiService.importData(this.projectId, this.selectedFile).subscribe(
      (response) => {
        console.log('Données importées avec succès:', response);
        this.loadProjectDetails();
      },
      (error) => {
        console.error('Erreur lors de l\'import des données:', error);
      }
    );
  }

  loadProjectDetails(): void {
    this.apiService.getProjects(this.projectId).subscribe(
      (response) => {
        this.projectDetails = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du projet:', error);
      }
    );
  }
  navigateToDetailGroup(projectId: string, groupId: string) {
    // Construire l'URL en incluant les IDs du projet et du groupe
    const url = `/detailGroup/${projectId}/${groupId}`;

    // Naviguer vers le composant de détail du groupe avec les IDs dans l'URL
    this.router.navigate([url]);
  }




}
