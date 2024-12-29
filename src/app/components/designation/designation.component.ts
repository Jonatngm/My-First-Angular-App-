import { Component, inject, OnInit } from '@angular/core';
import { APIResponseModel, IDesignation } from '../../model/interface/role';
import { MasterService } from './../../services/master.service';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {

  designationList: IDesignation[] = [];
  isLoader: boolean = true;
  masterService = inject(MasterService)

  ngOnInit(): void {
      this.masterService.getDesignations().subscribe((result:APIResponseModel)=>{
      this.designationList = result.data;
      this.isLoader = false;
      },error=>{
        alert("API error/ Network Down")
        this.isLoader = false;
      })
  }

}
