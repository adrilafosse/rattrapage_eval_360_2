import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8080';
  //private apiUrl = 'https://my-api-service-utezoxe3yq-ew.a.run.app';

  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouvel utilisateur dans Firestore
  createUser(firstName: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/api/users`;

    // Données du nouvel utilisateur à envoyer à l'API
    const userData = {
      name: firstName,
      email: email,
      password: password,
    };

    // Effectuer la requête POST vers l'API
    return this.http.post<any>(url, userData);
  }

  // Méthode pour se connecter avec un e-mail et un mot de passe
  loginWithEmailAndPasword(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/api/login`;

    // Données de connexion à envoyer à l'API
    const loginData = {
      email: email,
      password: password,
    };

    // Effectuer la requête POST vers l'API
    return this.http.post<any>(url, loginData);
  }

  createProject(projectName: string): Observable<any> {
    const url = `${this.apiUrl}/api/create_project`;

    // Données du projet à envoyer à l'API
    const projectData = {
      project_name: projectName
    };

    // Effectuer la requête POST vers l'API
    return this.http.post<any>(url, projectData);
  }

  getProjects(userId: string): Observable<any> {
    const url = `${this.apiUrl}/api/projects`;

    // Effectuer la requête GET vers l'API en incluant l'ID de l'utilisateur dans les paramètres
    return this.http.get<any>(url, { params: { user_id: userId } });
  }

  importData(projectId: string, file: File): Observable<any> {
    const url = `${this.apiUrl}/api/projects/${projectId}/import`;

    // Créer un objet de type FormData pour envoyer le fichier au serveur
    const formData = new FormData();
    formData.append('file', file);

    // Effectuer la requête POST vers l'API pour importer les données depuis le fichier CSV
    return this.http.post<any>(url, formData);
  }
  getGroupsWithStudents(projectId: string): Observable<any> {
    const url = `${this.apiUrl}/api/projects/${projectId}/groups_with_students`;
    return this.http.get(url);
  }

  getGroupAndStudents(projectId: string, groupId: string): Observable<any> {
    const url = `${this.apiUrl}/api/projects/${projectId}/groups/${groupId}`;
    return this.http.get<any>(url);
  }
  createNote(projectId: string, groupId: string, studentId: string, noteData: any): Observable<any> {
    const url = `${this.apiUrl}/api/projects/${projectId}/groups/${groupId}/students/${studentId}/create_note`;
    return this.http.post(url, noteData);
  }
  getGroupWithNotes(projectId: string, groupId: string): Observable<any> {
    const url = `${this.apiUrl}/api/projects/${projectId}/groups/${groupId}/with_notes`;
    return this.http.get<any>(url);
  }
  storeGroupAverage(projectId: string, groupId: string, average: number): Observable<any> {
    const url = `${this.apiUrl}/api/projects/${projectId}/groups/${groupId}/store_group_average`;
    const data = { average };
    return this.http.post(url, data);
  }


}
