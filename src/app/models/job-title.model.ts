import { ResourceModel } from './resource.model';
interface Info {
  arName: string;
  enName: string;
  id: number;
  fnId: string;
  parent: number;
}
// export interface JobTitle {
//   updatedBy: number;
//   updatedOn: Date;
//   clientData: string;
//   arName: string;
//   enName: string;
//   status: 0;
//   statusDateModified: '2023-04-12T10:57:16.741Z';
//   jobType: 0;
//   isSystem: true;
//   statusInfo: {
//     arName: string;
//     enName: string;
//     id: 0;
//     fnId: string;
//     parent: 0;
//   };
//   typeInfo: {
//     arName: string;
//     enName: string;
//     id: 0;
//     fnId: string;
//     parent: 0;
//   };
//   id: 0;
// }

export class JobTitle extends ResourceModel<JobTitle> {
  // public id!: number;
  // public   updatedBy?: number;
  // public   updatedOn?: Date;
  // public clientData?:string;
  // public arName?:string;
  // public enName?:string;
  // public status?:boolean;
  public statusDateModified!: Date;
  public jobType!: number;
  public isSystem!: boolean;
  public statusInfo?: Info;
  public typeInfo?: Info;

  constructor(model?: Partial<JobTitle>) {
    super(model);
  }
}
