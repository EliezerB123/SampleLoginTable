import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { DataService } from 'src/app/services/data.service';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';
import { PopupModifyRowComponent } from '../popup-modify-row/popup-modify-row.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private gridApi?: GridApi;
  columnDefs: ColDef[];
  frameworkComponents: any;

  constructor(public dataService: DataService,public dialog: MatDialog) { 
    
    //Define the columns of our table.
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

    // Define the component used to render our custom column
    // which contains our custom Edit and Delete buttons.
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    }
  }

  ngOnInit(): void {
  }
  
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.dataService.getData().subscribe((data)=>{
      this.gridApi?.setRowData(data);
    });
  }

   onFilterTextBoxChanged(event:any): void {
     //TODO: Rewrite this to use an Angular Reactive form instead of a basic <input>.
     //TODO: Add autocomplete. We can get it from "this.dataService.data".
    const text = event.target.value.toString();
    this.gridApi?.setQuickFilter(text);
  }


  openNewRowModal(): void{
    this.dialog.open(PopupModifyRowComponent, {
      height: '400px',
      width: '600px',
    });
  }

}
