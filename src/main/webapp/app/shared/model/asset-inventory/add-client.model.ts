export interface IClient {
  id?: number;
  clientName?: String;
}

export class Client implements IClient {
  constructor(public id?: number, public clientName?: String) {}
}
