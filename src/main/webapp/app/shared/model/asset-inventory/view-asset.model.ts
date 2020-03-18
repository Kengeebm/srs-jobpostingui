import { Moment } from 'moment';

export interface IViewAllAsset {
  id?: number;
  assetType?: String;
  serialNumber?: String;
  modelNumber?: String;
  manufacturer?: String;
  procurementDate?: Moment;
  assignTo?: String;
  assignmentDate?: Moment;
  status?: String;
  reason?: String;
  releaseDate?: Moment;
  clientName?: String;
  locationName?: String;
}

export class ViewAllAsset implements IViewAllAsset {
  constructor(
    public id?: number,
    public assetType?: String,
    public serialNumber?: String,
    public modelNumber?: String,
    public manufacturer?: String,
    public procurementDate?: Moment,
    public assignTo?: String,
    public assignmentDate?: Moment,
    public status?: String,
    public reason?: String,
    public releaseDate?: Moment,
    public clientName?: String,
    public locationName?: String
  ) {}
}
