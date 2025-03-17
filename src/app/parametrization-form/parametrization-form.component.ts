import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ParameterBase} from './parametrization-form.interfaces';
import {ParameterControlService} from "./services/parameter-control.service";
import {DynamicFormParameterComponent} from "./components/dynamic-form-parameter/dynamic-form-parameter.component";

@Component({
  selector: 'app-parametrization-form',
  templateUrl: './parametrization-form.component.html',
  providers: [ParameterControlService],
  imports: [CommonModule, DynamicFormParameterComponent, ReactiveFormsModule],
  standalone: true
})
export class ParametrizationFormComponent implements OnInit {
  @Input() parameters: ParameterBase<string>[] | null = [];
  form!: FormGroup;

  constructor(private qcs: ParameterControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.parameters as ParameterBase<string>[]);
  }

  getParameters() {
    return this.form.getRawValue();
  }
}
