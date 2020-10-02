import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { log } from 'util';
import {Item} from "./item";
import  {map}  from 'rxjs/operators'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DashBoard';
  inventoryList : Item[];
  itemValue : Item;
  amount : number;

  constructor(private http:HttpClient) {}

  ngOnInit()
  {
    this.amount = 0;
    this.clearItemValue();
    this.getItems();
  }

  clearItemValue(){
    this.itemValue = {"name": "", "description": "", "count": 0, "id": null}
  }

  private getItems(){
    this.inventoryList = [];
    this.http.get('http://localhost:3000/api/items')
    .pipe(
      map(responseData => {
        const arr = [];
        for(const key in responseData)
        {
          
          this.inventoryList.push(responseData[key])
        }
      })     
    )
    .subscribe(items =>{
      console.log(items);      
    })    
  }

  addItem()
  {
    this.http.post('http://localhost:3000/api/items',this.itemValue).subscribe(resposneData => {
      console.log(resposneData);
    });
    
  }

  updateItem()
  {

  }

 deleteItem(id:string){
      this.http.delete(`http://localhost:3000/api/items/${id}`).subscribe()
  }

  depositAmount(item:Item){
    const request = this.getPatchObject(item)
    this.http.patch('http://localhost:3000/api/items/deposit',request).subscribe()
  }

  withdrawAmount(item:Item){
    const request = this.getPatchObject(item)
    this.http.patch('http://localhost:3000/api/items/withdraw',request).subscribe()
  }

  private getPatchObject(item: Item)
  {
    return {id:item.id,amount:this.amount};
  }
  
}
