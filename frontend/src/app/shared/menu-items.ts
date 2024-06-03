import { Injectable } from "@angular/core";

export interface Menu{
  state:string;
  name:string;
  icon:string;
  role:string;
}

const MENUITEMS =[
  {state:'dashboard', name:'Início', icon:'home', role:''},
  {state:'category', name:'Obras', icon:'construction', role:''},
  {state:'material', name:'Estoque', icon:'inventory_2', role:''},
  {state:'user', name:'Perfil', icon:'people', role:'admin'}
];

@Injectable()
export class MenuItems{
  getMenuItem(): Menu[] {
    return MENUITEMS;
  }
}
