export interface IConfigParameterSingle {
  "py/object": string
  name: string;
  description: string;
  default: string | { "py/id": number }; // Ensure correct type
  parameter_id: string;
}

export enum ConfigParameterGroupType {
  ONE = "ONE",
  ANY = "ANY" // Explicitly set string values
}

export interface IConfigParameterGroupEntry {
  description: string;
  value: string; // Assuming this should always be a string
  parameter_id: string;
}

export interface IConfigParameterGroup {
  "py/object": string
  parameter_id: string;
  name: string;
  group_type: ConfigParameterGroupType;
  description: string;
  default: string[];
  options: IConfigParameterGroupEntry[];
}

export interface IConfigParametrization {
  parameters: (IConfigParameterSingle | IConfigParameterGroup)[];
  ref: string;
}


export class ParameterBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  controlType: string;
  options: {key: string; value: string}[];
  constructor(
    options: {
      value?: T;
      description?: string;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      options?: {key: string; value: string}[];
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.controlType = options.controlType || '';
    this.options = options.options || [];
  }
}

export class SingleParameter extends ParameterBase<string> {
  override controlType = 'textbox';
}

export class GroupParameter extends ParameterBase<string> {
}
