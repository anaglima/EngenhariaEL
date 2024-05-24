import { Injectable } from "@angular/core";

export interface Menu{
  state:string;
  name:string;
  icon:string;
  role:string;
}

const MENUITEMS =[
  {state:'dashboard', name:'Início', icon:'dashboard', role:''},
  {state:'category', name:'Obras', icon:'category', role:'admin'}
];

@Injectable()
export class MenuItems{
  getMenuItem(): Menu[] {
    return MENUITEMS;
  }
}
