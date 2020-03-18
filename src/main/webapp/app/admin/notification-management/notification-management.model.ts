export interface INotification {
  id?: any;
  message?: string;
  publishedDate?: string;
}

export class Notification implements INotification {
  constructor(public id?: string, public message?: string, public publishedDate?: string) {}
}
