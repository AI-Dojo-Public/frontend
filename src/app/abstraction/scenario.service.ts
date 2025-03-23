import { inject, Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, of, switchMap} from 'rxjs';

export interface IAvailableScenarios {
  available_configurations: string[];
}

export interface IScenario {
  configuration_json: string
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/scenario/';

  constructor() {}

  listScenarios(): Observable<IAvailableScenarios> {
    return this.http.get<IAvailableScenarios>(`${this.apiUrl}list/`);
  }

  getScenario(name: string): Observable<IScenario> {
    return this.http.get<IScenario>(`${this.apiUrl}get/`, { params: { 'file_name': name } });
  }

  getScenarioImage(name: string): Observable<string> {
    return this.http
      .get(`${this.apiUrl}get/image/`, { params: {'file_name': name}, responseType: 'blob' }) // Request image as Blob
      .pipe(
        map((blob: Blob) => URL.createObjectURL(blob)) // Convert Blob to Object URL
      );
  }

  // getScenarioImage(name: string): Observable<string | null> {
  //   return this.http
  //     .get(`${this.apiUrl}get/image/`, { params: { 'file_name': name }, responseType: 'blob' }) // Request image as Blob
  //     .pipe(
  //       switchMap((blob: Blob) => {
  //         if (!blob.size) return of(null); // Handle empty responses
  //
  //         return new Observable<string>((observer) => {
  //           const reader = new FileReader();
  //           reader.readAsDataURL(blob); // Convert Blob to Base64
  //           reader.onloadend = () => {
  //             observer.next(reader.result as string); // Emit Base64 URL
  //             observer.complete();
  //           };
  //           reader.onerror = () => observer.error('Failed to read image');
  //         });
  //       }),
  //       catchError(() => of(null)) // Return null if any error occurs
  //     );
  // }
}
