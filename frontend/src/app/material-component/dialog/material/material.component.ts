import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConstructionService } from 'src/app/services/construction.service';
import { MaterialService } from 'src/app/services/material.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  onAddMaterial = new EventEmitter();
  onEditMaterial = new EventEmitter();
  materialForm:any = FormGroup;
  dialogAction:any ="Add";
  action:any = "Add";
  responseMessage:any;
  constructions:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private formBuilder:FormBuilder,
private materialService:MaterialService,
public dialogRef:MatDialogRef<MaterialComponent>,
private constructionService:ConstructionService,
private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.materialForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      constructionId:[null,Validators.required],
      materialId:[null,Validators.required],
      description:[null,Validators.required],
      supplier:[null,Validators.required],
      quantity:[null,Validators.required]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.materialForm.patchValue(this.dialogData.data);
    }
    this.getConstructions()
  }

  getConstructions(){
    this.constructionService.getConstruction().subscribe((response)=>{
      this.constructions = response;
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.materialForm.value;
    var data = {
      name:formData.name,
      constructionId:formData.constructionId,
      materialId:formData.materialId,
      description:formData.description,
      supplier:formData.supplier,
      quantity:formData.quantity
    }
    this.materialService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddMaterial.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
  edit(){
    var formData = this.materialForm.value;
    var data = {
      id: this.dialogData.data.id,
      name:formData.name,
      constructionId:formData.constructionId,
      materialId:formData.materialId,
      description:formData.description,
      supplier:formData.supplier,
      quantity:formData.quantity

    }
    this.materialService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditMaterial.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
