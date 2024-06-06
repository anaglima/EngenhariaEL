import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConstructionService } from 'src/app/services/construction.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {
  onAddConstruction = new EventEmitter();
  onEditConstruction = new EventEmitter();
  constructionForm :any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private constructionService:ConstructionService,
  public dialogRef:MatDialogRef<ConstructionComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.constructionForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      constructionId:[null,Validators.required],
      local:[null,Validators.required],
      status:[null,Validators.required],
      reponsible:[null,Validators.required]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.constructionForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit()
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.constructionForm.value;
    var data = {
      name: formData.name,
      constructionId:formData.constructionId,
      local:formData.local,
      status:formData.status,
      responsible:formData.responsible

    }
    this.constructionService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddConstruction.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
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
    var formData = this.constructionForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name,
      constructionId:formData.constructionId,
      local:formData.local,
      status:formData.status,
      responsible:formData.responsible
    }
    this.constructionService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditConstruction.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"succes");
    },(error:any)=>{
      this.dialogRef.close();
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
