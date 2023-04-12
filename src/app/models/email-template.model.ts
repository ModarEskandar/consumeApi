import { ResourceModel } from './resource.model';

// export interface emailTempleate {
//   updatedBy: number;
//   updatedOn: '2023-04-12T11:11:55.210Z';
//   clientData: string;
//   id: 0;
//   arName: string;
//   enName: string;
//   status: true;
//   isGlobal: true;
//   enSubjectTemplate: string;
//   enBodyTemplate: string;
//   arSubjectTemplate: string;
//   arBodyTemplate: string;
//   }

export class EmailTemplate extends ResourceModel<EmailTemplate> {
  // public id!: number;
  // public   updatedBy?: number;
  // public   updatedOn?: Date;
  // public clientData?:string;
  // public arName?:string;
  // public enName?:string;
  // public status?:boolean;
  public isGlobal!: boolean;
  public enSubjectTemplate?: string;
  public enBodyTemplate?: string;
  public arSubjectTemplate?: string;
  public arBodyTemplate?: string;

  constructor(model?: Partial<EmailTemplate>) {
    super(model);
  }
}

// ------ example ------
//   const johnDoe = new emailTempleate({ firstName: 'John', lastName: 'Doe', ... });
//   const johnDoeAsJSON = johnDoe.toJson();
