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
        // try {
            const item = Inventory.get(id)
            if(!item)
                throw new Error("The item with the given ID was not found")

            return item;
        // } catch (error) {
        //     console.log("s");
        //     throw error
        // }
    }

    async updateItem(item)
    {
        try {
            const {id, name, description, count} = item;
            const updatedItem = await this.getItemById(id)

            await validateItem(item)   
            updatedItem.name = name;
            updatedItem.description = description;
            updatedItem.count = count;
            return updatedItem;

        } catch (error) {
           throw error
        }
    }

    async addItem(item)
    {
        try {
            await validateItem(item)
            const {name, description, count} = item
            const newItem = new Item(name, description, count);
            return Inventory.set(newItem)

        } catch (error) {
            throw error;
        }                  
    }

    async removeItemById(id)
    {
        // try {
            if(!Inventory.delete(id))
                throw new Error("The item with the given ID was not found")
            
            return "The item with the given ID was successfully deleted";


        // } catch (error) {
        //     throw error
        // }       
    }

    async withdrawItem(payload)
    {
        
        const {id, amount} = payload
        try {
            const item = await this.getItemById(id)
            item.withdraw(amount)
            return item;

        } catch (error) {
            throw error
        }
        
    }

    async depositItem(payload)
    {
        const {id, amount} = payload
        try {
            const item = await this.getItemById(id)
            item.deposit(amount)
            return item;

        } catch (error) {
            throw error
        }
      
    }
}





   
