const ItemService = require("../service/ItemService");
const ItemServiceInstance= new ItemService();
const asyncMiddleware = require("../middleware/async")
const express = require("express");
const router = express.Router();



router.get("/", async (req, res) => {  // Get Items - Returns a list of all items in the inventory

      res.send(await ItemServiceInstance.getAllItems());
})

router.get("/:id", asyncMiddleware (async (req, res) => { // Get Item By ID - Find item by ID and return the item details from the inventory.
    
    const id = req.params.id;
    const result = await ItemServiceInstance.getItemById(id)
    res.status(200).send(result);
  }));

router.put("/", asyncMiddleware( async (req, res) => { // Update Item - Find an item by ID and update the item details in the inventory.
    
    const itemBody = req.body
    const result =  await ItemServiceInstance.updateItem(itemBody);
    res.status(200).send(result);
}));

router.post("/", asyncMiddleware (async (req, res) => { // Add Item - Add a new item to the inventory and assign it an ID.

    itemBody = req.body  
    const result =  await ItemServiceInstance.addItem(itemBody);
    res.status(201).send(result);
}));

router.delete("/:id", asyncMiddleware(async (req, res) => {  // Remove Item - Find an item by ID and remove it from the inventory
  
    const id = req.params.id;
    const result = await ItemServiceInstance.removeItemById(id)
    res.status(200).send(result);
}));

router.patch("/withdraw", asyncMiddleware (async (req, res) => { // Withdraw Item - Receive an Item ID and amount of item to withdraw from the inventory, and update the item count appropriately  

    const payload = req.body
    const result = await ItemServiceInstance.withdrawItem(payload)
    res.status(200).send(result);
 }));

router.patch("/deposit", asyncMiddleware (async (req, res) => {  // Deposit Item - Receive an Item ID and amount of item to deposit to the inventory and update the item count appropriately
   
    const payload = req.body
    const result = await ItemServiceInstance.depositItem(payload)
    res.status(200).send(result);
 }));

module.exports = router;
