import { inject, Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IEnvironment {
  id: string;
  platform: IPlatformSpecification;
  configuration: string;
}

export interface IPlatformSpecification {
  type: number;
  provider: string;
}

export interface IParametrization {
  single_parameters: object;
  group_parameters: object;
}

interface IActionResponse {
  id: string;
  state: string;
  success: boolean;
  message: string;
}

export interface IEnvironmentOut {
  id: string;
  platform: string;
  provider: string;
  state: string;
  agent_manager_port: number;
}

export interface IAvailableConfigurations {
  available_configurations: string[];
}

export interface IConfigurationJson {
  configuration_json: string
}

interface IHTTPValidationError {
  detail: IValidationError[];
}

interface IValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/environment/';

  constructor() { }

  createEnvironment(environment: IEnvironment): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}create/`, environment);
  }

  initEnvironment(id: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}init/`, null, { params: { "id": id } });
  }

  configureEnvironment(id: string, parametrization: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}configure/`, { parameters: parametrization}, { params: { "id": id} });
  }

  resetEnvironment(id: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}reset/`, null, { params: { "id": id } });
  }

  terminateEnvironment(id: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}terminate/`, null, { params: { "id": id } });
  }

  commitEnvironment(id: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}commit/`, null, { params: { "id": id } });
  }

  pauseEnvironment(id: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}pause/`, null, { params: { "id": id } });
  }

  runEnvironment(id: string): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(`${this.apiUrl}run/`, null, { params: { "id": id } });
  }

  listEnvironments(): Observable<IEnvironmentOut[]> {
    return this.http.get<any>(`${this.apiUrl}list/`);
  }

  getEnvironment(id: string): Observable<IEnvironmentOut> {
    return this.http.get<IEnvironmentOut>(`${this.apiUrl}get/`, { params: { "id": id } });
  }

  listConfigurations(): Observable<IAvailableConfigurations> {
    return this.http.get<IAvailableConfigurations>(`${this.apiUrl}configuration/list/`);
  }

  getConfiguration(name: string): Observable<IConfigurationJson> {
    return this.http.get<IConfigurationJson>(`${this.apiUrl}configuration/get/`, { params: { 'file_name': name } });
  }
}

