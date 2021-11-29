import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { Tabledata } from 'src/app/models/tabledata';
import { PopupModifyRowComponent } from '../popup-modify-row/popup-modify-row.component';


/**
 * This component is the renderer we use to create our custom column.
 * It contains HTML for two buttons:
 * a. Edit
 * b. Delete
 */
@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {
  private params: any;
  private gridApi?: GridApi;
  constructor(public dialog: MatDialog){
  }
  
  agInit(params: any): void {
    this.params = params;
    this.gridApi = this.params.api;
  }

  refresh(params: ICellRendererParams): boolean{
    return false;
  }

  editBtnClickedHandler(event: any): void {
    console.log('Opening Edit popup');
    
    const rowData: Tabledata = this.params.data;
    const index: number = this.params.rowIndex;
    this.dialog.open(PopupModifyRowComponent, {
      height: '400px',
      width: '600px',
      data: {
        ...rowData,
        index: index
      }
    });
  }

  deleteBtnClickedHandler(event: any): void {
    const data = this.params.data;
    //TODO: Replace confirm with Angular Material dialog message.
    if (confirm('Are you sure you want to delete this?')){
      this.gridApi?.applyTransaction({ remove: [data] });
    }
  }
}