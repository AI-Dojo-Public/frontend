import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {concatMap, map, Observable} from 'rxjs';
import {
  EnvironmentService,
  IEnvironment,
} from "../abstraction/environment.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ParametrizationService} from "../parametrization-form/services/parametrization.service";
import {ParametrizationFormComponent} from "../parametrization-form/parametrization-form.component";
import {ParameterBase} from "../parametrization-form/parametrization-form.interfaces";
import {MaterialModule} from "../abstraction/material-module/material.module";
import {ScenarioService} from "../abstraction/scenario.service";
import {AlertDialog} from '../alert-dialog/alert-dialog.component';
import {MatDialog} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoadingService} from "../abstraction/loading.service";


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
    MaterialModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  environmentForm: FormGroup;
  parameters$?: Observable<ParameterBase<string>[]>;
  availableConfigurations$!: Observable<string[]>;


  @ViewChild(ParametrizationFormComponent) parametrizationFormComponent!: ParametrizationFormComponent;

  constructor(
    private environmentService: EnvironmentService,
    private scenarioService: ScenarioService,
    private parametrizationService: ParametrizationService,
    private fb: FormBuilder,
    private service: ParametrizationService,
    public dialog: MatDialog,
    private loadingService: LoadingService
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
    this.availableConfigurations$ = this.scenarioService.listScenarios().pipe(
      map(configs => configs.available_configurations)
    );


    // Subscribe to changes in the configuration field
    this.environmentForm.get('configuration')?.valueChanges.subscribe(selectedValue => {
      this.fetchAndParseConfiguration(selectedValue);
    });
  }


  fetchAndParseConfiguration(selectedValue: string) {
    this.scenarioService.getScenario(selectedValue).subscribe(response => {
      this.parameters$ = this.parametrizationService.parseConfiguration(response.configuration_json);
      console.log(this.parameters$)
    });
  }

  createEnvironment() {
    const environment: IEnvironment = this.environmentForm.value;
    environment.parameters = this.parametrizationFormComponent.getParameters();
    // This looks weird for now, maybe put it in a card with the spinning wheel
    // if (environment.platform.type == 2) {
    //   this.loadingService.setText("Creating emulation environment this make take a while...");
    // }

    this.loadingService.loadingOn();
    this.environmentService.createEnvironment(environment).pipe(
      concatMap(configureResponse => {
        console.log('Environment created and configured:', configureResponse);
        return this.environmentService.initEnvironment(configureResponse.id);
      })
    ).subscribe({
      next: (initResponse) => {
        this.loadingService.loadingOff();
        console.log('Environment initialized:', initResponse);
        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Check',
            message: 'Environment created successfully'
          }
        });
      },
      error: (error) => {
        this.loadingService.loadingOff();
        console.error('Error:', error);
        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Error',
            message: 'Environment creation failed',
            buttonText: 'Uh oh!'
          }
        });
      }
    });
  }
}



