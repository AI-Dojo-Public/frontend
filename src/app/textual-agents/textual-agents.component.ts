import {AsyncPipe} from '@angular/common';
import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ParameterBase} from "../parametrization-form/parametrization-form.interfaces";
import {ParametrizationService} from "../parametrization-form/services/parametrization.service";
import {ParametrizationFormComponent} from "../parametrization-form/parametrization-form.component";


@Component({
  selector: 'app-textual-agents',
  standalone: true,
  imports: [ParametrizationFormComponent, AsyncPipe],
  providers: [ParametrizationService],
  templateUrl: './textual-agents.component.html',
  styleUrl: './textual-agents.component.scss'
})
export class TextualAgentsComponent {
  // parameters$: Observable<ParameterBase<any>[]>;

  constructor(service: ParametrizationService) {

  }
}

