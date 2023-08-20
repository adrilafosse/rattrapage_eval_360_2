import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProjetComponent } from './projet/projet.component';

import { DetailGroupComponent } from './detail-group/detail-group.component';
import { NotationComponent } from './notation/notation.component';
import { DetailNotationComponent } from './detail-notation/detail-notation.component';



const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil/:id', component: AccueilComponent },
  { path: 'projet/:id/:name', component: ProjetComponent },

  { path: 'student/:projectId/:groupId/:studentId/:studentName/:studentLastName/notation', component: NotationComponent },
  { path: 'detail-notation/:groupId/:projectId', component: DetailNotationComponent },

  { path: 'detailGroup/:projectId/:groupId', component: DetailGroupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
