import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: any[] = [];
  page = 1;

  // 🔴 BACKEND SOLO ENTIENDE `search`
  filters = {
    search: ''
  };

  loading = false;
  error: string | null = null;

  constructor(private service: PersonService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    const params: any = {
      page: this.page,
      ordering: '-created_at'
    };

    // 🔴 CLAVE: mandar `search`
    if (this.filters.search) {
      params.search = this.filters.search;
    }

    this.service.list(params).subscribe({
      next: (res: any) => {
        this.persons = res.results;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Error al cargar personas';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.page = 1;   // reset de paginación
    this.load();
  }

  delete(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar esta persona?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }

  nextPage(): void {
    this.page++;
    this.load();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}
