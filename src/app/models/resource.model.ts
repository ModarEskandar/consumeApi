export abstract class ResourceModel<T> {
  public id?: number;
  public updatedBy?: number;
  public updatedOn?: Date;
  public clientData?: string;
  public arName?: string;
  public enName?: string;
  public status?: number;

  constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
    if (this.updatedOn) {
      this.updatedOn = new Date(this.updatedOn);
    }
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}
