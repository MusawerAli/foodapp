import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// class imageSnippet {
//   constructor(public src:string,public file:File) {

//   }
//  }
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  base64textString:any;
  size:any=[];
  vendor:any=[];
  type:any=[];
  form:FormGroup;
  file:any;
  createForm() {
    this.form = this.fb.group({
    menue :new FormControl('', Validators.required),
    description :new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
    qty : new FormControl('', Validators.required),
    file : new FormControl(''),
    })
    
  }



  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddComponent>,

    ) { this.createForm();}



    

  ngOnInit(): void {
  }

  addMenue(form_value){
     this.dialogRef.close({action:'Add',data:form_value});
     
  }
  @ViewChild("dataInput") dataInput;
  //selectedFile:imageSnippet;
  imageUpload(e){
    debugger
    this.file = e.target.files[0];
    if(this.file){
    }
    // this.form.patchValue({"file":this.files});
    // console.log(this.createForm);

    // if (this.file) {
    //     var reader = new FileReader();

    //     reader.onload =this.handleFile.bind(this);
    //     reader.readAsBinaryString(this.file);

    // }
  }

    // handleFile(file) {
    //   let fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   console.log(fileReader.result);
    // }
    // fileReader.readAsText(this.file);

    // }
    closePopUp(){

    }
}
