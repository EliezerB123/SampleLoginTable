import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tabledata } from 'src/app/models/tabledata';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modify-row-form',
  templateUrl: './modify-row-form.component.html',
  styleUrls: ['./modify-row-form.component.scss']
})
export class ModifyRowFormComponent implements OnInit {
  form = new FormGroup({
    make: new FormControl(''),
    model: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(private dataService: DataService, public dialogRef: MatDialogRef<ModifyRowFormComponent>,@Inject(MAT_DIALOG_DATA) public rowData?: Tabledata & {index:number}) { }
  // @Input() rowData?: Tabledata & {index:number};
  ngOnInit(): void {
    // If we're editing data, then fill in the current values.
    if (this.rowData){
      this.form.controls.make.setValue(this.rowData.make);
      this.form.controls.model.setValue(this.rowData.model);
      this.form.controls.price.setValue(this.rowData.price);
    }
  }
  
  save(): void {
    console.log('rowdata',this.rowData);
    if (this.rowData && Object.keys(this.rowData).length > 0) {
      
      // If we're working with data that already exists, we'll modify the existing hero.
      this.dataService.updateRow(this.form.value, this.rowData.index);
    } else {
      // If we didn't work with existing data, then creat a new hero.
      this.dataService.addRow(this.form.value);
    }
    //TODO: Close this element.
    this.dialogRef.close('');
  }

}
