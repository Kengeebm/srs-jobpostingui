export interface IProject {
  id?: string;
  name?: string;
  projectCode?: string;
}

export class Project implements IProject {
  constructor(public id?: string, public name?: string, public projectCode?: string) {}
}
