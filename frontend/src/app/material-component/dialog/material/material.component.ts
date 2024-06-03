import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
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
  categorys:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private formBuilder:FormBuilder,
private materialService:MaterialService,
public dialogRef:MatDialogRef<MaterialComponent>,
private categoryService:CategoryService,
private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.materialForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null,Validators.required],
      price:[null,Validators.required],
      description:[null,Validators.required]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.materialForm.patchValue(this.dialogData.data);
    }
    this.getCategorys()
  }

  getCategorys(){
    this.categoryService.getCategory().subscribe((response)=>{
      this.categorys = response;
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
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description,
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
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description,

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
