import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ParameterBase} from "../../parametrization-form.interfaces";
import {MaterialModule} from "../../../abstraction/material-module/material.module";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './dynamic-form-parameter.component.html',
  styleUrl: './dynamic-form-parameter.component.scss'
})
export class DynamicFormParameterComponent {
  @Input() parameter!: ParameterBase<string>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.parameter.key].valid;
  }
  onMultiSelectChange(event: MatCheckboxChange, parameter: ParameterBase<string>): void {
    const control = this.form.get(parameter.key);

    if (control) {
      let selectedValues = control.value || [];

      if (event.checked) {
        selectedValues.push(event.source.value);
      } else {
        selectedValues = selectedValues.filter((v: string) => v !== event.source.value);
      }

      control.setValue(selectedValues);
    }
  }
}
