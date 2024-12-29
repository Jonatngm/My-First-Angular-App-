import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { Client } from '../model/class/Client';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  deleteClientProject(clientProjectId: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllClients ():Observable<APIResponseModel> {
  return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT)
  }


  getAllUser() {
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }

  getAllEmployee():Observable<APIResponseModel>{
  return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_EMP )
  }
  getAllClientProjects():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_PROJECT )
    }

  addUpdated (obj:Client):Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClient",obj)
    }
    deleteClientsById (id:number):Observable<APIResponseModel> {
      return this.http.delete<APIResponseModel>(environment.API_URL + "DeleteClientByClientId?clientId=" +id)
    }
    addClientProjectUpdate (obj:Client):Observable<APIResponseModel> {
      return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClientProject",obj)
      }
  }
