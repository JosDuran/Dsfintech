// src/app/persons/pages/person-list/person-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { PersonService } from '../../services/person.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PersonListComponent,      // standalone
        HttpClientTestingModule   // 🔹 provee HttpClient para PersonService
      ],
      providers: [
        PersonService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({ page: '1', ordering: '-created_at' }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
