//auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 🔹 necesario para HttpClient
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // 🔹 verifica que no queden requests pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and get token', () => {
    const token = '12345';
    service.storeToken(token);
    expect(service.getToken()).toBe(token);
  });

  it('should call login API', () => {
    const mockResponse = { access: 'abc', refresh: 'def' };
    service.login('user', 'pass').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/token/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
