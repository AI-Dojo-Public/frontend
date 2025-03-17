import { Injectable } from '@angular/core';
import {ParameterBase} from "../parametrization-form.interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ParameterControlService {

  toFormGroup(parameters: ParameterBase<string>[]) {
    const group: any = {};
    parameters.forEach((parameter) => {
      group[parameter.key] = parameter.required
        ? new FormControl(parameter.value || '', Validators.required)
        : new FormControl(parameter.value || '');
    });
    return new FormGroup(group);
  }
}
