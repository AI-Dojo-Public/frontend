import { Injectable } from '@angular/core';
import {
  ConfigParameterGroupType,
  GroupParameter,
  IConfigParameterGroup,
  IConfigParameterSingle,
  IConfigParametrization, ParameterBase, SingleParameter
} from "../parametrization-form.interfaces";
import {Observable, of} from "rxjs";
import {EnvironmentService} from "../../abstraction/environment.service";

@Injectable({
  providedIn: 'root'
})
export class ParametrizationService {

  constructor() {
  }

  parseConfigParametrization(jsonString: string): IConfigParametrization | null {
    try {
      const jsonObj = JSON.parse(jsonString);

      // Search for the configuration object
      const parametrization = Object.values(jsonObj).find(
        (item: any) => item["py/object"] === "cyst.api.configuration.configuration.ConfigParametrization"
      ) as IConfigParametrization | undefined;

      if (!parametrization) {
        console.warn("No valid ConfigParametrization found in JSON.");
        return null;
      }

      return {
        parameters: parametrization.parameters.map((param: any) => {
          if (param["py/object"] === "cyst.api.configuration.configuration.ConfigParameterSingle") {
            return {
              "py/object": param["py/object"],
              name: param.name,
              description: param.description,
              default: param.default,
              parameter_id: param.parameter_id,
            } as IConfigParameterSingle;
          } else {
            return {
              "py/object": param["py/object"],
              parameter_id: param.parameter_id,
              name: param.name,
              group_type: param.group_type._value as ConfigParameterGroupType,
              description: param.description,
              default: param.default,
              options: param.options?.map((opt: any) => ({
                description: opt.description,
                value: opt.value,
                parameter_id: opt.parameter_id,
              })) || [],
            } as IConfigParameterGroup;
          }
        }),
        ref: parametrization.ref
      };
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  createParametersFromConfig(config: IConfigParametrization): Observable<ParameterBase<string>[]> {
    try {
      if (!Array.isArray(config.parameters)) {
        throw new Error('Invalid configuration: "parameters" must be an array.');
      }

      const parameters: ParameterBase<string>[] = config.parameters.map(param => {
        if ("group_type" in param && param["py/object"] === "cyst.api.configuration.configuration.ConfigParameterGroup") {
          // It's an IConfigParameterGroup
          const controlType = param.group_type === ConfigParameterGroupType.ONE ? 'dropdown' : 'multi-select';

          return new GroupParameter({
            value: undefined,
            key: param.parameter_id,
            label: param.name,
            description: param.description,
            required: false,
            controlType: controlType,
            options: param.options.map(option => ({
              key: option.parameter_id,
              value: option.value
            }))
          });
        } else {
          // It's an IConfigParameterSingle
          return new SingleParameter({
            value: typeof param.default === 'string' ? param.default : undefined,
            key: param.parameter_id,
            label: param.name,
            description: param.description,
            required: false,
            controlType: 'textbox',
            options: []
          });
        }
      });

      return of(parameters);
    } catch (error) {
      console.error('Error processing configuration:', error);
      return of([]); // Return empty array on error
    }
  }

  parseConfiguration(jsonInput: string): Observable<ParameterBase<string>[]> {
    const parsedParametrization = this.parseConfigParametrization(jsonInput);
    if (parsedParametrization) {
      return this.createParametersFromConfig(parsedParametrization);
    }
    return of([]); // Return empty array if parsing failed
  }
}
