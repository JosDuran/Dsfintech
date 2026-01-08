import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  loading = false;
  error: string | null = null;

  constructor(private service: PersonService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.service.list({
      page: this.page,
      ordering: '-created_at'
    }).subscribe({
      next: (res: any) => {
        this.persons = res.results;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Error al cargar personas';
        this.loading = false;
      }
    });
  }

  delete(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar esta persona?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err: any) => console.error(err)
    });
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
