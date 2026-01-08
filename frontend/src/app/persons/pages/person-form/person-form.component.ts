// person-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  error: string | null = null;

  // usado en el HTML para distinguir editar / nuevo
  personId?: string;

  constructor(
    private fb: FormBuilder,
    private service: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // obtener ID desde la ruta
    this.personId = this.route.snapshot.paramMap.get('id') ?? undefined;

    // crear formulario
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });

    // 🔹 SI ES EDICIÓN → cargar persona
    if (this.personId) {
      this.loading = true;

      this.service.get(this.personId).subscribe({
        next: (person: any) => {
          this.form.patchValue({
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email
          });
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.error = 'No se pudo cargar la persona';
          this.loading = false;
        }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    // 🔹 CREATE o UPDATE
    const request$ = this.personId
      ? this.service.update(this.personId, this.form.value)
      : this.service.create(this.form.value);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/persons']);
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Error al guardar persona';
        this.loading = false;
      }
    });
  }
}
