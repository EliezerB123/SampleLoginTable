import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnModel, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Tabledata } from 'src/app/models/tabledata';
import { DataService } from 'src/app/services/data.service';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';
import { ModifyRowFormComponent } from '../modify-row-form/modify-row-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private gridApi?: GridApi;
  private gridColumnApi?: ColumnModel;
  rowData: Array<Tabledata> | undefined;
  columnDefs: ColDef[];
  frameworkComponents: any;
  constructor(public dataService: DataService,public dialog: MatDialog) { 
    this.columnDefs = [
      { field: 'make', sortable: true },
      { field: 'model', sortable: true },
      { field: 'price', sortable: true },
      {
        field: 'Edit',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          clicked: function(field: any) {
            alert(`${field} was clicked`);
          }
        },
        minWidth: 150,
      },
    ];
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    }
  }

  ngOnInit(): void {
  }
  
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.dataService.getData().subscribe((data)=>{
      this.rowData = data;
      console.log('newData!',data);
      this.gridApi?.setRowData(data);
    });
  }

   onFilterTextBoxChanged(event:any) {
     //TODO: Rewrite this to use an Angular Reactive form instead of a basic <input>.
     //TODO: Add autocomplete. We can get it from "this.data".
    const text = event.target.value.toString();
    this.gridApi?.setQuickFilter(text);
  }


  openRowPanel(){
  }
  openNewRowModal(){
    
    let dialogRef = this.dialog.open(ModifyRowFormComponent, {
      height: '400px',
      width: '600px',
      data: {
      }
    });
  }
  


  deleteRow(row: Tabledata){
    
  }

}
