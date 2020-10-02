import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  errorMessage = null;

  constructor(private http:HttpClient) {}

  ngOnInit()
  {
    this.clearItemValue();
    this.getItems();
  }

  clearItemValue(){
    this.itemValue = {"name": "", "description": "", "count": 0, "id": null}
  }

  private showError(error)
  {
    this.errorMessage= error.error;
    setTimeout(()=>{ this.errorMessage = null}, 2000);
  }

  private getItems(){
    this.inventoryList = [];
    this.http.get('http://localhost:3000/api/items')
    .pipe(
      map( (responseData:Item) => {
        for(const key in responseData)
        {  
          this.inventoryList.push(responseData[key])
        }
      })     
    )
    .subscribe(()=>{
    })    
  }

  addItem()
  {
    this.http.post('http://localhost:3000/api/items',this.itemValue).subscribe(() => {
      this.getItems()
    }, err=>{
      this.showError(err);
    });
  }

  updateItem(item:Item)
  {  
    this.http.put('http://localhost:3000/api/items',item).subscribe(() => {
      this.getItems()
    }, err=>{
      this.showError(err);
    }  
    );
  }

 deleteItem(item:Item){
      this.http.delete(`http://localhost:3000/api/items/${item.id}`).subscribe( () => {
        this.getItems()}, err=>{
          this.showError(err);
        })
  }

  depositAmount(request){
   this.http.patch('http://localhost:3000/api/items/deposit',request).subscribe(() => {
    this.getItems()}, err=>{
      this.showError(err);
    })
  }

  withdrawAmount(request){
    this.http.patch('http://localhost:3000/api/items/withdraw',request).subscribe(()=> {
      this.getItems()}, err=>{
        this.showError(err);
      })  
  }
}
