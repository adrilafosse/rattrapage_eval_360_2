import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.css']
})
export class DetailGroupComponent implements OnInit {
  projectId: string | null = null;
  groupId: string | null = null;
  groupData: any;
  showStudentLinks = false;
  currentDate: string = '';
  showJuryNoteForm: boolean = false;
  juryFirstName: string = '';
  juryMembers: string[] = [];
  juryNotes: (number | null)[] = [];
  juryNote: number | null = null;
  notesLocked: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
      this.groupId = params.get('groupId');

      if (this.projectId && this.groupId) {
        this.apiService.getGroupAndStudents(this.projectId, this.groupId)
          .subscribe(
            (data) => {
              this.groupData = data;
              this.showStudentLinks = true;
              this.currentDate = new Date().toISOString();
            },
            (error) => {
              console.error('Error fetching group data:', error);
              this.showStudentLinks = false;
            }
          );
      }
    });
  }

  generateStudentLinks() {
    this.groupData.students.forEach((student: any) => {
      student.showLink = true;
      student.uniqueLink = `/student/${this.projectId}/${this.groupId}/${student.id}/${student.name}/${student.lastname}/notation`;
    });

    this.showStudentLinks = true; // Show links after generating them
  }
  addJuryMember() {
    if (this.juryFirstName.trim() !== '') {
      this.juryMembers.push(this.juryFirstName);
      this.juryNotes.push(null); // Ajout d'une entrée null pour la note correspondante
      this.juryFirstName = ''; // Réinitialiser le champ de saisie
    }
  }

  lockNotes() {
    this.notesLocked = true; // Verrouillez les notes pour éviter toute modification ultérieure
    const average = this.calculateAverage(); // Calculer la moyenne des notes
    if (this.projectId && this.groupId) {
      this.apiService.storeGroupAverage(this.projectId, this.groupId, average)
      .subscribe(
      (response) => {
        console.log('Moyenne enregistrée avec succès:', response);
        // Peut-être rediriger ou afficher un message de succès ici
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la moyenne:', error);
        // Gérer l'erreur ou afficher un message d'erreur ici
      }
    );
    }

  }


  calculateAverage(): number {
    let totalNotes = 0;
    let validNotesCount = 0;

    for (const note of this.juryNotes) {
      if (note !== null) {
        totalNotes += note;
        validNotesCount++;
      }
    }

    if (validNotesCount > 0) {
      return totalNotes / validNotesCount;
    } else {
      return 0;
    }
  }



}
