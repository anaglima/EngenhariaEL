import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+
      "/construction/add/",data,{
        headers: new HttpHeaders().set('Contet-Type',"application/json")
      })
  }

  update(data:any){
    return this.httpClient.patch(this.url+
      "/construction/update/",data,{
        headers: new HttpHeaders().set('Contet-Type',"application/json")
      })
  }

  getConstruction(){
    return this.httpClient.get(this.url+"/construction/get/");
  }
}
