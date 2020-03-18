export interface IRequest {
  id?: string;
  empId?: string;
  name?: string;
  message?: string;
  fileName?: string;
  attachment?: any;
}

export class Request implements IRequest {
  constructor(
    public id?: string,
    public empId?: string,
    public name?: string,
    public message?: string,
    public fileName?: string,
    public attachment?: any
  ) {}
}
