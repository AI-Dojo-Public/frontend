import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import {environment} from "../../environments/environment";

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
  private apiUrl = environment.restApiUrl + '/agents/';

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
    return this.http.post<PackageEntry[]>(`${this.apiUrl}add`, agent)
  }

  /**
   * Remove an agent
   * @param agent AgentRemoval object
   * @returns Observable of response object
   */
  removeAgent(agent: AgentRemoval): Observable<object> {
    return this.http.post<object>(`${this.apiUrl}remove`, agent)
  }
}
