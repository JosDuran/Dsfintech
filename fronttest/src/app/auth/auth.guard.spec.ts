// src/app/auth/auth.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Creamos un spy para Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // para HttpClient en AuthService
      providers: [
        AuthGuard,
        AuthService,
        { provide: Router, useValue: routerSpy } // inyectamos el mock
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should allow activation if token exists', () => {
    // simulamos que hay token
    spyOn(authService, 'getToken').and.returnValue('123');
    const result = guard.canActivate(); // ⚡ sin argumentos
    expect(result).toBe(true);
  });

  it('should redirect to login if no token', () => {
    // simulamos que no hay token
    spyOn(authService, 'getToken').and.returnValue(null);
    const result = guard.canActivate(); // ⚡ sin argumentos
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});

