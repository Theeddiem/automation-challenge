import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { log } from 'util';
import { Item } from '../item';

@Component({
  selector: 'item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})
export class ItemRowComponent implements OnInit {


  updatedItem : Item;

  @Input() public depositCallBack: Function; 

  @Input() currentItem : Item

  errorMessage:null;

  @Output() updateEvent = new EventEmitter<Item>()

  @Output() deleteEvent = new EventEmitter<Item>()

  @Output() withdrawEvent = new EventEmitter<object>()

  @Output() depositEvent = new EventEmitter<object>()

  showUpdate : boolean;

  amount : number;

  constructor() { }

  ngOnInit(): void {
    this.showUpdate = false;
    this.updatedItem = {name:"", description: "" , count: 0 , id: ""}
  }

  invokeUpdate() { 

    if(!this.showUpdate)
    {
      this.showUpdate = true
    }
    else 
    {
     if(this.updatedItem.description!="" && this.updatedItem.name!="")
    {
       this.updatedItem.id = this.currentItem.id;
       this.updateEvent.emit(this.updatedItem);
     }
     this.showUpdate = false

    }

 }

  invokeDelete()
  {
    this.deleteEvent.emit(this.currentItem);
  }

  invokeWithdraw(){
    if(this.amount > 0)
    this.withdrawEvent.emit(this.getPatchObject());
    else{
      this.showError("amount must be greater than 0")
    }
  }

  private showError(error)
  {
    this.errorMessage= error
    setTimeout(()=>{ this.errorMessage = null}, 2000);
  }
  invokeDeposit(){
    if(this.amount > 0)
    this.depositEvent.emit(this.getPatchObject());   
    else{
      this.showError("amount must be greater than 0")
    }
  }

  private getPatchObject()
  {
    return {id:this.currentItem.id, amount:this.amount};
  }

}
