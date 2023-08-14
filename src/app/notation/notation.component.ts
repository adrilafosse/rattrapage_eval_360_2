import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

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
  groupData: any;
  isButtonDisabled = true;
  notesSubmitted = false;

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
            (data: any) => {
              this.groupData = data;
              this.groupData.students.forEach((student: any) => {
                student.isEditable = true;
              });
            },
            (error: any) => {
              console.error('Error fetching group data:', error);
            }
          );
      }
    });
  }

  validateNotes() {
    const studentInfoList: any[] = this.groupData.students.map((student: any) => ({
      id: student.id,
      id2: this.studentId,
      name: student.name,
      lastname: student.lastname,
      results: student.results,
      skills: student.skills,
      motivation: student.motivation,
      communication: student.communication
    }));

    this.groupData.students.forEach((student: any) => {
      student.isEditable = false;
    });
    this.isButtonDisabled = true;

    studentInfoList.forEach((studentInfo: any) => {
      const noteData = {
        note: studentInfo.results,
        id: studentInfo.id,
        id2: studentInfo.id2,
        results: studentInfo.results,
        skills: studentInfo.skills,
        motivation: studentInfo.motivation,
        lastname: studentInfo.lastname,
        name: studentInfo.name,
        communication: studentInfo.communication
      };

      this.apiService.createNote(this.projectId!, this.groupId!, studentInfo.id, noteData)
        .subscribe(
          (response: any) => {
            console.log('Note created:', response);
            this.notesSubmitted = true;
          },
          (error: any) => {
            console.error('Error creating note:', error);
          }
        );
    });
  }

  checkFields(): void {
    let allFieldsFilledAndValid = true;
    this.groupData.students.forEach((student: any) => {
      if (
        student.results === undefined ||
        student.results < 0 ||
        student.results > 20 ||
        isNaN(student.results as number) ||
        student.results === '' ||
        student.skills === undefined ||
        student.skills === '' ||
        student.motivation === undefined ||
        student.motivation === '' ||
        student.communication === undefined ||
        student.communication === ''
      ) {
        allFieldsFilledAndValid = false;
      }
    });

    this.isButtonDisabled = !allFieldsFilledAndValid;
  }
}
