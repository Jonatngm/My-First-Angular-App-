import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from './../../model/class/Client';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.css']
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup;
  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];
  firstName = signal("Angular Project");

  projectList = signal<ClientProject[]>([]);

  constructor() {
    this.projectForm = new FormGroup({
      clientProjectId: new FormControl(0),
      projectName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      startDate: new FormControl(""),
      expectedEndDate: new FormControl(""),
      leadByEmpId: new FormControl(""),
      completedDate: new FormControl(""),
      contactPerson: new FormControl(""),
      contactPersonContactNo: new FormControl(""),
      totalEmpWorking: new FormControl(""),
      projectCost: new FormControl(""),
      projectDetails: new FormControl(""),
      contactPersonEmailId: new FormControl(""),
      clientId: new FormControl("")
    });
  }

  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployee();
    this.getAllClientProjects();
  }

  changeFistName() {
    this.firstName.set("ReactJs");
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
    });
  }

  getAllClientProjects() {
    this.clientSrv.getAllClientProjects().subscribe((res: APIResponseModel) => {
      this.projectList.set(res.data as ClientProject[]);
    });
  }

  getAllClient() {
    this.clientSrv.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    });
  }

  // Edit project method
  onEdit(item: ClientProject) {
    this.projectForm.patchValue({
      clientProjectId: item.clientProjectId,
      projectName: item.projectName,
      startDate: item.startDate,
      expectedEndDate: item.expectedEndDate,
      leadByEmpId: item.leadByEmpId,
      completedDate: item.completedDate,
      contactPerson: item.contactPerson,
      contactPersonContactNo: item.contactPersonContactNo,
      totalEmpWorking: item.totalEmpWorking,
      projectCost: item.projectCost,
      projectDetails: item.projectDetails,
      contactPersonEmailId: item.contactPersonEmailId,
      clientId: item.clientId
    });
  }

  // Save project method
  onSaveProject() {
    const formValue = this.projectForm.value;
    if (formValue.clientProjectId === 0) {
      this.clientSrv.addClientProjectUpdate(formValue).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("The Project was Created Successfully");
          this.getAllClientProjects();
        } else {
          alert(res.message);
        }
      });
    } else {
      this.clientSrv.addClientProjectUpdate(formValue).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("The Project was Updated Successfully");
          this.getAllClientProjects();
        } else {
          alert(res.message);
        }
      });
    }
  }

  // Reset form method
  onReset() {
    this.projectForm.reset();
  }
}
