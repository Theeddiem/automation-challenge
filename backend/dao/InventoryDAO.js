const { v4: uuidv4 } = require('uuid');
const Item  = require("../models/item");

module.exports = class InventoryDAO {

    constructor()
    {
           this.inventory = new Map(); 
           const firstItem = new Item("Guitar","music instrument")
           firstItem.id = "1";
          // this.set(firstItem)
           this.inventory.set("1",firstItem)  
           const secondItem = new Item("Milk", "a Dairy product")
           secondItem.id = "2";
           this.inventory.set("2",secondItem)        
           //this.set(secondItem)
           const thirdItem = new Item("Bottle", "plastice bottle",2000)
           thirdItem.id = "3";
           this.inventory.set("3",thirdItem)        
   }

    set(item)
    {
       item.id = uuidv4()
       this.inventory.set(item.id,item)
       return this.inventory.get(item.id)
    }

    get(key)
    {
       if(!this.inventory.get(key))
          throw new Error("The item with the given ID was not found")
       return this.inventory.get(key);
    }

    getAll()
    {
       return [ ...this.inventory.values() ]
    }

    delete(key)
    {
       if(this.get(key))
          return this.inventory.delete(key)
    }

}