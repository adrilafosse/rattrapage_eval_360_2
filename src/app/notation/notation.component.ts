import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'; // Import your ApiService here

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css']
})
export class NotationComponent implements OnInit {
  projectId: string | null = null;
  groupId: string | null = null;
  studentId: string | null = null;
  studentName: string | null = null;
  studentLastName: string | null = null;
  groupData: any; // Add this variable to store student data

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
      this.groupId = params.get('groupId');
      this.studentId = params.get('studentId');
      this.studentName = params.get('studentName');
      this.studentLastName = params.get('studentLastName');

      if (this.projectId && this.groupId) {
        this.apiService.getGroupAndStudents(this.projectId, this.groupId)
          .subscribe(
            (data) => {
              this.groupData = data;
            },
            (error) => {
              console.error('Error fetching group data:', error);
            }
          );
      }
    });
  }
  validateNotes() {
    this.groupData.students.forEach((student: any) => {
      // Store the notes for each student in the student object
      student.notes = {
        results: student.results,
        skills: student.skills,
        motivation: student.motivation,
        communication: student.communication
      };
    });

    console.log("Notes saved in component:", this.groupData.students);
  }

}
