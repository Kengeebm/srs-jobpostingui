export interface IChartDetail {
  name?: string;
  y?: number;
}

export class ChartDetail implements IChartDetail {
  constructor(public name?: string, public y?: number) {}
}
