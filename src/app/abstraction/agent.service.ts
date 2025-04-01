import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface PackageEntry {
  module_name: string;
  package_name: string;
  package_version: string;
  code_path: string;
  git_repo: boolean;
}

export interface AgentAddition {
  method: string;
  path: string;
  user: string;
  access_token: string;
}

export interface AgentRemoval {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/agents/';

  constructor() {}

  /**
   * List all agents
   * @returns Observable of PackageEntry array
   */
  listAgents(): Observable<PackageEntry[]> {
    return this.http.get<PackageEntry[]>(`${this.apiUrl}list`).pipe(
      catchError(error => {
        console.error('Error fetching agent list:', error);
        return of([]);
      })
    );
  }

  /**
   * Add a new agent
   * @param agent AgentAddition object
   * @returns Observable of added PackageEntry array
   */
  addAgent(agent: AgentAddition): Observable<PackageEntry[]> {
    return this.http.post<PackageEntry[]>(`${this.apiUrl}add`, agent).pipe(
      catchError(error => {
        console.error('Error adding agent:', error);
        return of([]);
      })
    );
  }

  /**
   * Remove an agent
   * @param agent AgentRemoval object
   * @returns Observable of response object
   */
  removeAgent(agent: AgentRemoval): Observable<object> {
    return this.http.post<object>(`${this.apiUrl}remove`, agent).pipe(
      catchError(error => {
        console.error('Error removing agent:', error);
        return of({});
      })
    );
  }
}
