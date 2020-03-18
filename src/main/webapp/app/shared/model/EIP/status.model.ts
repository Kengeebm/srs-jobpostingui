export interface IStatus {
  id?: string;
  name?: string;
}

export class Status implements IStatus {
  constructor(public id?: string, public name?: string) {}
}
