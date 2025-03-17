import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import {FormsModule, FormBuilder, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {concatMap, map, Observable} from 'rxjs';
import {
  EnvironmentService,
  IEnvironment,
  IEnvironmentOut,
  IPlatformSpecification
} from "../abstraction/environment.service";
import {AsyncPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ParametrizationService} from "../parametrization-form/services/parametrization.service";
import {ParametrizationFormComponent} from "../parametrization-form/parametrization-form.component";
import {ParameterBase} from "../parametrization-form/parametrization-form.interfaces";
import {MaterialModule} from "../abstraction/material-module/material.module";


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    ParametrizationFormComponent,
    AsyncPipe,
    NgIf,
    MaterialModule
  ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  environmentForm: FormGroup;
  parameters$?: Observable<ParameterBase<string>[]>;
  availableConfigurations$!: Observable<string[]>;


  @ViewChild(ParametrizationFormComponent) parametrizationFormComponent!: ParametrizationFormComponent;

  constructor(
    private environmentService: EnvironmentService,
    private parametrizationService: ParametrizationService,
    private fb: FormBuilder,
    private service: ParametrizationService
  ) {
    this.environmentForm = this.fb.group({
      id: 'test_environment',
      configuration: "",
      platform: this.fb.group({
        type: 1,
        provider: 'CYST'
      }),
    });
  }

  ngOnInit(): void {
    this.availableConfigurations$ = this.environmentService.listConfigurations().pipe(
      map(configs => configs.available_configurations)
    );


    // Subscribe to changes in the configuration field
    this.environmentForm.get('configuration')?.valueChanges.subscribe(selectedValue => {
      this.fetchAndParseConfiguration(selectedValue);
    });
  }


  fetchAndParseConfiguration(selectedValue: string) {
    this.environmentService.getConfiguration(selectedValue).subscribe(response => {
      this.parameters$ = this.parametrizationService.parseConfiguration(response.configuration_json);
      console.log(this.parameters$)
    });
  }

  createEnvironment() {
    const environment: IEnvironment = this.environmentForm.value;
    const filledParameters: string = this.parametrizationFormComponent.getParameters();

    this.environmentService.createEnvironment(environment).pipe(
      concatMap(response => {
        console.log('Environment created:', response);
        return this.environmentService.configureEnvironment(response.id, filledParameters);
      }),
      concatMap(configureResponse => {
        console.log('Environment configured:', configureResponse);
        return this.environmentService.initEnvironment(configureResponse.id);
      })
    ).subscribe(initResponse => {
      console.log('Environment initialized:', initResponse);
    }, error => {
      console.error('Error:', error);
    });
  }
}



