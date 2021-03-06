const Item = require("../models/item");
const InventoryDAO = require("../dao/InventoryDAO");
const Inventory = new InventoryDAO();
const validateItem = require("../validation/ItemValidationSchema");

module.exports = class ItemService {
  async getAllItems() {
    return Inventory.getAll();
  }

  async getItemById(id) {
    return Inventory.get(id);
  }

  async updateItem(item) {
    const { id, name, description, count } = item;
    const updatedItem = Inventory.get(id);

    await validateItem(item);
    updatedItem.name = name;
    updatedItem.description = description;
    updatedItem.count = count;
    return updatedItem;
  }

  async addItem(item) {
    await validateItem(item);
    const { name, description, count } = item;
    const newItem = new Item(name, description, count);
    return Inventory.set(newItem);
  }

  async removeItemById(id) {
    Inventory.delete(id);
    return { message: "The item with the given ID was successfully deleted" };
  }

  async withdrawItem(payload) {
    const { id, amount } = payload;
    if (!Number.isFinite(amount)) throw new Error("amount should be a number");
    if (amount <= 0) throw new Error("amount should be larger than zero");
    const item = Inventory.get(id);
    if (item.count - amount < 0)
      throw new Error("you trying to withdraw too much");
    item.withdraw(amount);
    return item;
  }

  async depositItem(payload) {
    const { id, amount } = payload;
    if (!Number.isFinite(amount)) throw new Error("amount should be a number");
    if (amount <= 0) throw new Error("amount should be larger than zero");
    const item = Inventory.get(id);
    item.deposit(amount);
    return item;
  }
};
