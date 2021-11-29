import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { ModifyRowFormComponent } from '../modify-row-form/modify-row-form.component';

@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  private params: any;
  private gridApi?: GridApi;
  constructor(public dialog: MatDialog){
  }
  
  ngOnInit(){
    this.gridApi = this.params.api;
  }
  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean{
    return false;
  }

  editBtnClickedHandler(event: any) {
    console.log('params',this.params);
    console.log('api',this.gridApi);
    
    const rowData = this.params.data;
    const index = this.params.rowIndex;
    // this.gridApi?.applyTransaction({ remove: [rowData] });
    // this.params.clicked(this.params.value);
    // modifyRow(row: Tabledata, index:number){
    let dialogRef = this.dialog.open(ModifyRowFormComponent, {
      height: '400px',
      width: '600px',
      data: {
        ...rowData,
        index: index
      }
    });
  }

  deleteBtnClickedHandler(event: any) {
    const data = this.params.data;
    //TODO: Replace confirm with popup message.
    if (confirm('Are you sure you want to delete this?')){
      this.gridApi?.applyTransaction({ remove: [data] });
    }
  }

  ngOnDestroy() {
  }
}