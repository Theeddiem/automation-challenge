const { log } = require("console");
const express = require("express");
const router = express.Router();
const ItemService = require("../service/ItemService");
const ItemServiceInstance= new ItemService();

router.get("/", async (req, res) => {  // Get Items - Returns a list of all items in the inventory

      res.send(await ItemServiceInstance.getAllItems());
})

router.get("/:id", async (req, res) => { // Get Item By ID - Find item by ID and return the item details from the inventory.
    
    const id = req.params.id;
    try {
        const item = await ItemServiceInstance.getItemById(id)
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error.message);
    }  
  });
  

router.put("/", async (req, res) => { // Update Item - Find an item by ID and update the item details in the inventory.
    
    const itemBody = req.body

    try {
        const result =  await ItemServiceInstance.updateItem(itemBody);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

router.post("/", async (req, res) => { // Add Item - Add a new item to the inventory and assign it an ID.

    itemBody = req.body  
    try {
        const result =  await ItemServiceInstance.addItem(itemBody);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {  // Remove Item - Find an item by ID and remove it from the inventory
  
    const id = req.params.id;

    try {
            const result = await ItemServiceInstance.removeItemById(id)
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }

});

router.patch("/withdraw", async (req, res) => { // Withdraw Item - Receive an Item ID and amount of item to withdraw from the inventory, and update the item count appropriately  

    const payload = req.body
    
    try {
        const result = await ItemServiceInstance.withdrawItem(payload)
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }



});

router.patch("/deposit", async (req, res) => {  // Deposit Item - Receive an Item ID and amount of item to deposit to the inventory and update the item count appropriately
   
    const payload = req.body
    
    try {
        const result = await ItemServiceInstance.depositItem(payload)
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }

});

module.exports = router;
