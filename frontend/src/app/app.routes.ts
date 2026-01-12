import { Routes } from '@angular/router';
import { PersonListComponent } from './persons/pages/person-list/person-list.component';
import { PersonFormComponent } from './persons/pages/person-form/person-form.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'persons', component: PersonListComponent },
  { path: 'persons/new', component: PersonFormComponent },
  { path: 'persons/:id/edit', component: PersonFormComponent },

  { path: '**', redirectTo: 'login' }
];
