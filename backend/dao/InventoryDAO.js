const { v4: uuidv4 } = require("uuid");
const Item = require("../models/item");

module.exports = class InventoryDAO {
  // customMap I made

  constructor() {
    this.inventory = new Map();
  }

  set(item) {
    item.id = uuidv4();
    this.inventory.set(item.id, item);
    return this.inventory.get(item.id);
  }

  get(
    key // O(1)
  ) {
    if (!this.inventory.get(key))
      throw new Error("The item with the given ID was not found");
    return this.inventory.get(key);
  }

  getAll() {
    return [...this.inventory.values()]; // need to return array cause Json cannot return map.
  }

  delete(key) {
    if (this.get(key)) return this.inventory.delete(key);
  }
};
