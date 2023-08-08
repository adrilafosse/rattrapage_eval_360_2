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



}
