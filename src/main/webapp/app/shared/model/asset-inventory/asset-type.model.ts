import { Moment } from 'moment';

export interface IAssetList {
  id?: number;
  assetName?: String;
}

export class AssetList implements IAssetList {
  constructor(public id?: number, public assetName?: String) {}
}
