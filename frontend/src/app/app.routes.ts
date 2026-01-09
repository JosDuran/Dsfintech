//app.routes.ts
import { Routes } from '@angular/router';
import { PersonListComponent } from './persons/pages/person-list/person-list.component';
import { PersonFormComponent } from './persons/pages/person-form/person-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/new', component: PersonFormComponent },
  { path: 'persons/:id/edit', component: PersonFormComponent },
];
