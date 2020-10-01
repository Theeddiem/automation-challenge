const Item  = require("../models/item");
const  InventoryDAO = require("../dao/InventoryDAO");
const Inventory = new InventoryDAO(); 
const validateItem = require("../validation/ItemValidationSchema");
const { log } = require("console");

module.exports = class ItemService {

    async getAllItems()
    {
        return Inventory.getAll();
    }

    async getItemById (id)
    {
        const item = Inventory.get(id)
        if(!item)
            throw new Error("The item with the given ID was not found")

         return item;
    }

    async updateItem(item)
    {
        const {id, name, description, count} = item;
        const updatedItem = await this.getItemById(id)

        await validateItem(item)   
        updatedItem.name = name;
        updatedItem.description = description;
        updatedItem.count = count;
        return updatedItem;   
    }

    async addItem(item)
    {
      
        await validateItem(item)
        const {name, description, count} = item
        const newItem = new Item(name, description, count);
        return Inventory.set(newItem)                   
    }

    async removeItemById(id)
    {
        if(!Inventory.delete(id))
            throw new Error("The item with the given ID was not found")
            
        return "The item with the given ID was successfully deleted";  
    }

    async withdrawItem(payload)
    {
        
        const {id, amount} = payload
        const item = await this.getItemById(id)
        item.withdraw(amount)
         return item;       
    }

    async depositItem(payload)
    {
        const {id, amount} = payload
        const item = await this.getItemById(id)
        item.deposit(amount)
        return item;    
    }
}





   
