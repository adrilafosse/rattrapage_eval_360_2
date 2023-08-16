import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail-notation',
  templateUrl: './detail-notation.component.html',
  styleUrls: ['./detail-notation.component.css']
})
export class DetailNotationComponent implements OnInit {
  groupId: string | null = null;
  projectId: string | null = null;
  groupData: any; // Contiendra les données du groupe avec les notes
  receivedNotes: { [studentId: string]: any[] } = {};
  comparisonList: any[] = [];
  studentIds: string[] = [];
  receivedStudents: any[] = [];
  comparisonResults: any[] = [];
  studentAverages: { [studentId: string]: any } = {};
  groupAverage: number | undefined;
  studentAverageKeys: string[] = [];



  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');
      this.projectId = params.get('projectId');
      if (this.groupId && this.projectId) {
        this.apiService.getGroupWithNotes(this.projectId, this.groupId)
          .subscribe(
            (data: any) => {
              this.groupData = data;
              console.log("Comparison List:", this.groupData);
              this.receivedStudents = data.students; // Supposons que les étudiants sont dans la propriété "students" de l'objet data
              this.extractStudentIds(); // Appelle la fonction pour extraire les IDs des étudiants
              this.displayStudentData(); // Affiche les IDs des étudiants et les notes

            },

            (error: any) => {
              console.error('Error fetching group data:', error);
            }
          );
      }
      if (this.groupId && this.projectId) {
        this.apiService.getGroupAverage(this.projectId, this.groupId)
          .subscribe(
            (data: any) => {
              this.groupAverage = data.average;
            },
            (error: any) => {
              console.error('Error fetching group average:', error);
            }
          );
      }
    });
  }

  extractStudentIds() {
    // Extrayez les IDs des étudiants et stockez-les dans la liste des IDs d'étudiants
    this.studentIds = this.receivedStudents.map(student => student.id);
  }

  displayStudentData() {
    let comparisonCount = 0;
    this.comparisonResults = [];
     // Réinitialiser le tableau avant d'y ajouter de nouvelles données


    for (const student of this.receivedStudents) {
      for (const otherStudent of this.receivedStudents) {
        otherStudent.notes.forEach((note: any) => {
          if (student.id === note.student_info.id) {
            comparisonCount++;

            const comparisonResult = {
              studentId: student.id,


              noteValue: note.value,
              skills: note.student_info.skills,
              motivation: note.student_info.motivation,
              communication: note.student_info.communication,
              results: note.student_info.results,
              lastname: note.student_info.lastname,
              name: note.student_info.name
            };

            this.comparisonResults.push(comparisonResult);
          }
        });
      }
    }

    console.log(`Total Comparisons: ${comparisonCount}`);
    this.studentAverages = [];
    for (const student of this.receivedStudents) {
      const studentReceivedNotes = this.comparisonResults.filter(result => result.studentId === student.id);
      const receivedNoteValues = studentReceivedNotes.map(result => result.noteValue);
      const receivedAverage = receivedNoteValues.length > 0 ? receivedNoteValues.reduce((total, value) => total + value, 0) / receivedNoteValues.length : 0;

      // Stockez les informations dans le tableau des moyennes
      this.studentAverages[student.id] = {
        id: student.id,
        name: student.name,
        lastname: student.lastname,
        average: receivedAverage
      };
    }

    // Construire le tableau de clés des moyennes d'étudiants
    this.studentAverageKeys = Object.keys(this.studentAverages);

    for (const student of this.receivedStudents) {
      const studentAverage = this.studentAverages[student.id]?.average || 0;
      let combinedAverage: number = 0; // Assigner une valeur par défaut
      let calculationDescription: string = ''; // Stocker la description du calcul

      if (this.groupAverage !== undefined) {
        // Calculer la moyenne combinée en tenant compte de la limite de perte maximale pour le groupe
        const maxPossibleGroupAverage = this.groupAverage - 2;

        if (maxPossibleGroupAverage > studentAverage) {
          // Utiliser la moyenne du groupe moins 2 comme note finale
          combinedAverage = maxPossibleGroupAverage;
          calculationDescription = `Combined Average Calculation: Using Group Average - 2 (${maxPossibleGroupAverage})`;
        } else {
          // Utiliser la moyenne combinée des deux moyennes
          combinedAverage = (studentAverage + this.groupAverage) / 2;
          calculationDescription = `Combined Average Calculation: (${studentAverage} + ${this.groupAverage}) / 2 = ${combinedAverage}`;
        }
      }

      student.combinedAverage = combinedAverage;
      student.calculationDescription = calculationDescription;
    }





    // Afficher le tableau des clés des moyennes dans la console
    console.log(this.studentAverageKeys);


  }

}
