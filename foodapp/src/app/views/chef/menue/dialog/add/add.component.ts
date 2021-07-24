import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  //selectedFile:imageSnippet;
  
  imageUpload(imageInput:any){
    debugger;
    var files = imageInput.files[0];
    

    if (files) {
        var reader = new FileReader();

        reader.onload =this.handleFile.bind(this);
        reader.readAsBinaryString(files);
     
    }
  }

    handleFile(event) {
      var binaryString = event.target.result;
            this.base64textString= btoa(binaryString);
            
             console.log(btoa(this.base64textString))
           
    }    
    closePopUp(){
     
    }
}
