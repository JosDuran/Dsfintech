const routes: Routes = [
  {
    path: 'persons',
    loadChildren: () =>
      import('./persons/persons.module').then(m => m.PersonsModule)
  },
  { path: '', redirectTo: 'persons', pathMatch: 'full' }
];
