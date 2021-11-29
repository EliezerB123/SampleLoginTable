import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tabledata } from '../models/tabledata';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: Array<Tabledata>;
  data$: ReplaySubject<Tabledata[]>;
  constructor(private http:HttpClient) { 
    this.data = [];
    this.data$ =  new ReplaySubject<Tabledata[]>();
    
    
    //Fetch the data from our JSON and cache it.
    this.http.get<Tabledata[]>('assets/tabledata.json').subscribe((data)=> {
      this.data = data;
      this.data$.next(data);
    });
  }


  getData(): ReplaySubject<Tabledata[]>{
    return this.data$;
  }

  addRow(row:Tabledata){
    this.data.push(row);
    this.data$.next(this.data);
  }
  
  updateRow(row:Tabledata,index: number){
    this.data[index].make = row.make;
    this.data[index].model = row.model;
    this.data[index].price = row.price;
    this.data$.next(this.data);
  }

  removeRow(index:number){
    this.data.splice(index,1);
    this.data$.next(this.data);
  }
}
