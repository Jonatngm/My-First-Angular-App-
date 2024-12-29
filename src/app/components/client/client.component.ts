import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from '../../model/class/Client';
import { APIResponseModel } from '../../model/interface/role';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";
import { MyButtonComponent } from '../../reusableComponent/my-button/my-button.component';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  currentDate:Date = new Date();

  clientObj: Client = new Client();

  clientList: Client[] = [];

  clientService = inject(ClientService);

userList$ : Observable<any> = new Observable<any>;

  ngOnInit(): void {
  this.loadClient();
  this.userList$ = this.clientService.getAllUser();
  }

  loadClient() {
   this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
    this.clientList = res.data;
   })
  }
  onSaveClient(data: string) {
    debugger;
  this.clientService.addUpdated(this.clientObj).subscribe((res:APIResponseModel)=>{
    if(res.result == true) {
    alert(" Client added successfully");
    this.loadClient();
    this.clientObj = new Client();
    } else {
      alert(res.message)
    }
  })
  }

  onEdit(data: Client) {
    this.clientObj = data;

  }

  onDelete(id : number) {

const isDelete = confirm("Are you sure you want to delete?");
if(isDelete == true) {
  this.clientService.deleteClientsById(id).subscribe((res:APIResponseModel)=>{
    if(res.result == true) {
    alert(" Client deleted successfully");
    this.loadClient();
    this.clientObj = new Client();
    } else {
      alert(res.message)
    }
  })
}

  }


}
