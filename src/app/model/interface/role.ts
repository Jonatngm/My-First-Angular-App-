export interface IRole {
  roleID: number,
  role: string,
}

export interface IDesignation {
  designationID: number,
  designation: string,
}

export interface APIResponseModel {
  message: string,
  result: boolean,
  data: any
}

export interface ClientProject {
    clientId: any
    contactPersonEmailId: any
    projectDetails: any
    projectCost: any
    totalEmpWorking: any
    contactPersonContactNo: any
    contactPerson: any
    completedDate: any
    leadByEmpId: any
    empName: string,
    empId: number,
    empCode: string,
    empEmailId: string,
    empDesignation: string,
    projectName: string,
    startDate: Date,
    expectedEndDate: Date,
    clientName: string,
    clientProjectId: number,

}

export interface Employee {
      empName: string,
      empId: number,
      empCode: string,
      empEmailId: string,
      empDesignation: string,
      role: string
}
