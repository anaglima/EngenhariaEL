import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+
      "/material/add/",data,{
        headers: new HttpHeaders().set("Content-Type","application/json")
      })
  }

  update(data:any){
    return this.httpClient.post(this.url+
      "/material/update/",data,{
        headers: new HttpHeaders().set("Content-Type","application/json")
      })
  }

  getMaterial(){
    return this.httpClient.get(this.url+"/material/get/");
  }

  updateStatus(data:any){
    return this.httpClient.post(this.url+
      "/material/updateStatus/",data,{
        headers: new HttpHeaders().set("Content-Type","application/json")
      })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+
      "/material/delete/"+id,{
        headers: new HttpHeaders().set("Content-Type","application/json")
      })
  }
}
