// person-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: any[] = [];
  page = 1;

  constructor(private service: PersonService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list({
      page: this.page,
      ordering: '-created_at'
    }).subscribe((res: any) => {
      this.persons = res.results;
      console.log('Datos recibidos:', this.persons);
    });
  }

  // ✅ Eliminar persona
  delete(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar esta persona?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err: any) => console.error(err)
    });
  }

  // ✅ Paginación
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
