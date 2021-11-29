import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tabledata } from 'src/app/models/tabledata';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-popup-modify-row',
  templateUrl: './popup-modify-row.component.html',
  styleUrls: ['./popup-modify-row.component.scss']
})
export class PopupModifyRowComponent implements OnInit {
  form = new FormGroup({
    make: new FormControl(''),
    model: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(private dataService: DataService, public dialogRef: MatDialogRef<PopupModifyRowComponent>,@Inject(MAT_DIALOG_DATA) public rowData?: Tabledata & {index:number}) {
    /*
    * A few things happen in the constructor here:
    * 1. We define dialogRef as a reference to the modal that opens us, which we need to close it. 
    * 2. We define rowData as the data passed to us from the modal that was opened.
    * See this for more info:
    * https://material.angular.io/components/dialog/overview
    */
    
   }

   ngOnInit(): void {
    // If we're editing data, then fill in the form with our current values.
    if (this.rowData){
      this.form.controls.make.setValue(this.rowData.make);
      this.form.controls.model.setValue(this.rowData.model);
      this.form.controls.price.setValue(this.rowData.price);
    }
  }
  
  // If we're working with data that already exists, we'll modify the existing row.
  // Otherwise, we'll add a new row.
  save(): void {
    if (this.rowData) {
      this.dataService.updateRow(this.form.value, this.rowData.index);
    } else {
      this.dataService.addRow(this.form.value);
    }

    //After saving, close this dialog.
    this.dialogRef.close('');
  }

}
