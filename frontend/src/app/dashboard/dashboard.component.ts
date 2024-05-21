import { Component, AfterViewInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { EstoqueComponent } from '../estoque/estoque.component';
import { ObrasComponent } from '../obras/obras.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  dialog: any;

  ngAfterViewInit() { }

  constructor() {
  }

  estoqueAction() {
    const dialogConfig = new MatDialogConfig
    dialogConfig.width = "550px";
    this.dialog.open(EstoqueComponent, dialogConfig);
  }

  obrasAction() {
    const dialogConfig = new MatDialogConfig
    dialogConfig.width = "550px";
    this.dialog.open(ObrasComponent, dialogConfig);
  }
}
