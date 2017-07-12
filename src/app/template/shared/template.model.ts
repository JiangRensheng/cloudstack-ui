import { FieldMapper } from '../../shared/decorators/';
import { BaseTemplateModel } from './base-template.model';


@FieldMapper({
  passwordenabled: 'isPasswordEnabled',
  templatetype: 'type'
})
export class Template extends BaseTemplateModel {
  public path = 'template';

  public format: string;
  public hypervisor: string;
  public isPasswordEnabled: boolean;
  public status: string;
  public type: string;
  public size: number;
}
